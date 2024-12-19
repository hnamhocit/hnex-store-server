import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { MediaModule } from '../media/media.module';
import { MailsService } from './mails.service';

@Module({
	imports: [
		MailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				transport: {
					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					auth: {
						user: configService.get('GMAIL_EMAIL'),
						pass: configService.get('GMAIL_PASSWORD'),
					},
				},
				defaults: {
					from: '"No Reply" <noreply@example.com>',
				},
				template: {
					dir: join(__dirname, 'templates'),
					adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
					options: {
						strict: true,
					},
				},
			}),
		}),
		MediaModule,
	],
	providers: [MailsService],
	exports: [MailsService],
})
export class MailsModule {}
