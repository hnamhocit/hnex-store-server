import {
	Controller,
	Get,
	Param,
	Post,
	Req,
	Res,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post('file')
	@UseGuards(AccessTokenGuard)
	@UseInterceptors(FileInterceptor('file'))
	async upload(
		@UploadedFile() file: Express.Multer.File,
		@Req() req: Request,
	) {
		return await this.uploadService.upload(file, req.user['sub']);
	}

	@Post('files')
	@UseGuards(AccessTokenGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploads(
		@UploadedFile() files: Express.Multer.File[],
		@Req() req: Request,
	) {
		return await this.uploadService.uploads(files, req.user['sub']);
	}

	@Get(':id')
	async getPhotoURL(@Param('id') id: string, @Res() res: Response) {
		const photo = await this.uploadService.getPhoto(id);
		res.contentType(photo.contentType);
		res.end(photo.buffer);
	}
}
