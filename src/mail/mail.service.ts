import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendActivationMail(email: string, name: string, code: string) {
		await this.mailerService.sendMail({
			to: email,
			subject: 'Activate your account 🚀',
			template: 'activate_account',
			context: { email, name, code },
		});
	}
}
