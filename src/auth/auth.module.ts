import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MailsModule } from '../mails/mails.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
	imports: [JwtModule.register({}), MailsModule],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
