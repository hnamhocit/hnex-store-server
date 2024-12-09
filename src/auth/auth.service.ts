import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';

import { MailService } from '../mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { generateOTP } from '../utils/generateOTP';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
	) {}

	async login(loginDto: LoginDto) {
		const existingUser = await this.prismaService.user.findUnique({
			where: { email: loginDto.email },
		});

		if (!existingUser) {
			throw new NotFoundException(
				`User with email ${loginDto.email} not found!`,
			);
		}

		const pwMatches = await verify(
			existingUser.password,
			loginDto.password,
		);

		if (!pwMatches) {
			throw new BadRequestException('Password is incorrect!');
		}

		const tokens = await this.getTokens(existingUser);
		this.updateRefreshToken(existingUser.id, tokens.refreshToken);

		return tokens;
	}

	async register(registerDto: RegisterDto) {
		const existingUser = await this.prismaService.user.findUnique({
			where: { email: registerDto.email },
		});

		if (existingUser) {
			throw new ConflictException('User already exists!');
		}

		const hashedPassword = await hash(registerDto.password);
		const OTP = generateOTP();
		const expiresIn = new Date(Date.now() + 5 * 60 * 1000);

		const newUser = await this.prismaService.user.create({
			data: {
				...registerDto,
				password: hashedPassword,
				activationCode: OTP,
				actionationCodeExpiredIn: expiresIn,
			},
		});

		await this.mailService.sendActivationMail(
			newUser.email,
			newUser.displayName,
			OTP,
		);

		const tokens = await this.getTokens(newUser);
		await this.updateRefreshToken(newUser.id, tokens.refreshToken);

		return tokens;
	}

	async logout(id: string) {
		await this.updateRefreshToken(id, null);
	}

	async refresh(id: string, refreshToken: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
		});

		if (!user || !user.refreshToken) {
			throw new UnauthorizedException('Access denied');
		}

		const refreshTokenMatches = await verify(
			user.refreshToken,
			refreshToken,
		);

		if (!refreshTokenMatches) {
			throw new UnauthorizedException('Access denied!');
		}

		const tokens = await this.getTokens(user);
		await this.updateRefreshToken(id, tokens.refreshToken);

		return tokens;
	}

	async updateRefreshToken(id: string, refreshToken: string | null) {
		const hashedRefreshToken = await hash(refreshToken);
		await this.prismaService.user.update({
			where: { id },
			data: { refreshToken: hashedRefreshToken },
		});
	}

	async getTokens(user: User) {
		const payload = { sub: user.id, email: user.email };

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: this.configService.get('JWT_ACCESS_SECRET'),
				expiresIn: this.configService.get('JWT_ACCESS_EXPIRESIN'),
			}),
			this.jwtService.signAsync(payload, {
				secret: this.configService.get('JWT_REFRESH_SECRET'),
				expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN'),
			}),
		]);

		return { accessToken, refreshToken };
	}
}
