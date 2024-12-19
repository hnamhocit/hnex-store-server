import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	@UseGuards(AccessTokenGuard)
	async getPosts() {
		return await this.postsService.getPosts();
	}

	@Get(':id')
	@UseGuards(AccessTokenGuard)
	async getPostDetail(@Param('id') id: string) {
		return await this.postsService.getPostDetail(id);
	}

	@Post()
	@UseGuards(AccessTokenGuard)
	async createPost(
		@Body() body: Prisma.PostCreateInput,
		@Req() req: Request,
	) {
		return await this.postsService.createPost(body, req.user['sub']);
	}

	@Delete(':id')
	@UseGuards(AccessTokenGuard)
	async deletePost(@Param('id') id: string) {
		return await this.postsService.deletePost(id);
	}

	@Patch(':id')
	@UseGuards(AccessTokenGuard)
	async updatePost(
		@Param('id') id: string,
		@Body() body: Prisma.PostUpdateInput,
	) {
		return await this.postsService.updatePost(id, body);
	}
}
