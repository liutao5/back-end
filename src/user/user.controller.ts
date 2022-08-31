import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post()
	async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
		try {
			await this.userService.create(createUserDto);
			const resJson = {
				ok: true,
				code: 0,
				errMsg: 'ok'
			}
			res.status(HttpStatus.CREATED).send(JSON.stringify(resJson))
		} catch (e) {
			if (e.message === '11000') {
				const resJson = {
					ok: false,
					code: 11000,
					errMsg: 'account already exist'
				}
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(resJson))
			} else {
				const resJson = {
					ok: false,
					code: 1,
					errMsg: 'service error'
				}
				res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(resJson))
			}
		}
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	// @Get(':id')
	// async findOne(@Param('id') id: string): Promise<User> {
	// 	return this.userService.findOne(id)
	// }

	@Delete()
	async delete(@Param('id') id: string) {
		return this.userService.delete(id)
	}

	@Post('/login')
	async login(@Param() params: { account: string; password: string }) {
		console.log(params)
	}
}