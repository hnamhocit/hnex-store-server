import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async getMe(id: string) {
		return await this.prismaService.user.findUnique({ where: { id } });
	}
}
