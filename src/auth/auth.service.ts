import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	async validateUser(account: string, pwd: string) {
		const user = await this.userService.findOne(account);
		if (user && user.password === pwd) {
			const { account, authList } = user;
			return { account, authList };
		}
		return null;
	}

	async login(user: any) {
		const payload = { sub: user.account, ...user };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
