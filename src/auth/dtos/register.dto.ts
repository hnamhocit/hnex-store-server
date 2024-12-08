import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
	@IsString()
	@IsNotEmpty()
	displayName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;
}
