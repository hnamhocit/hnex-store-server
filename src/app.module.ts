import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ReactionsModule } from './reactions/reactions.module';
import { PostsModule } from './posts/posts.module';
import { FollowsModule } from './follows/follows.module';
import { CommentsModule } from './comments/comments.module';
import { MailsModule } from './mails/mails.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		UsersModule,
		AuthModule,
		MediaModule,
		ReactionsModule,
		PostsModule,
		FollowsModule,
		CommentsModule,
		MailsModule,
	],
})
export class AppModule {}
