import {
	Controller,
	Get,
	Param,
	Post,
	Req,
	Res,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post('uploads')
	@UseGuards(AccessTokenGuard)
	@UseInterceptors(FilesInterceptor('files'))
	async upload(
		@UploadedFiles() files: Express.Multer.File[],
		@Req() req: Request,
	) {
		return await this.mediaService.uploads(files, req.user['sub']);
	}

	@Get(':id')
	async getUploadMedia(@Param('id') id: string, @Res() res: Response) {
		const { data } = await this.mediaService.getUploadMedia(id);
		res.contentType(data.contentType);
		res.end(data.buffer);
	}
}
