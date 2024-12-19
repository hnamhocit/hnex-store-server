import { Injectable } from '@nestjs/common';
import { MediaType } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
	constructor(private readonly prismaService: PrismaService) {}

	async uploads(files: Express.Multer.File[], userId: string) {
		const uploadedFiles = await Promise.all([
			...files.map(async (file) => {
				return await this.prismaService.media.create({
					data: {
						name: file.originalname,
						size: file.size,
						contentType: file.mimetype,
						buffer: file.buffer,
						type: file.mimetype
							.split('/')[0]
							.toUpperCase() as MediaType,
						userId,
					},
				});
			}),
		]);

		return { data: uploadedFiles };
	}

	async getUploadMedia(id: string) {
		const media = await this.prismaService.media.findUnique({
			where: { id },
		});
		return { data: media };
	}
}
