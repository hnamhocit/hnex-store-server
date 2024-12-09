import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AccessTokenGuard)
	@Get('me')
	async getMe(@Req() req: Request) {
		return await this.usersService.getMe(req.user['sub']);
	}
}
