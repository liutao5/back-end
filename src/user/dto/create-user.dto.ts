export class CreateUserDto {
	readonly account: string;
	password: string;
	authList: string[];
	readonly name: string;
	readonly age: number;
}
