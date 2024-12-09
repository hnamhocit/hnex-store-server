import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
	constructor(private readonly prismaService: PrismaService) {}

	async upload(file: Express.Multer.File, userId: string) {
		console.log({ file });

		const data = {
			buffer: file.buffer,
			name: file.originalname,
			contentType: file.mimetype,
			size: file.size,
			userId,
		};

		const newPhoto = await this.prismaService.upload.create({
			data: data,
		});

		return newPhoto;
	}

	async uploads(files: Express.Multer.File[], userId: string) {
		const newPhotos = files.map(async (file) => {
			return await this.upload(file, userId);
		});

		return newPhotos;
	}

	async getPhoto(id: string) {
		return await this.prismaService.upload.findUnique({ where: { id } });
	}
}
