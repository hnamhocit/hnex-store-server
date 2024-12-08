import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return await this.authService.login(loginDto);
	}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		return await this.authService.register(registerDto);
	}

	@Post('logout')
	async logout(@Param('id') id: string) {
		return await this.authService.logout(id);
	}

	@UseGuards(RefreshTokenGuard)
	@Get('refresh')
	async refresh(@Req() req: Request) {
		return await this.authService.refresh(
			req.user['sub'],
			req.user['refreshToken'],
		);
	}
}
