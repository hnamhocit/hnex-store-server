import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
	transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
		// "value" is an object containing the file's attributes and metadata
		const twoMb = 2 * 1024;
		return value.size < twoMb;
	}
}
