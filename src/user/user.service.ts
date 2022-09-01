import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
	) { }

	async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			const createdUser = await this.userModel.create(createUserDto);
			return createdUser;
		} catch (e) {
			return Promise.reject(new Error(e.code))
		}
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async findOne(account: string): Promise<User> {
		return this.userModel.findOne({ account }).exec();
	}

	async delete(id: string) {
		const deletedUser = await this.userModel
			.findByIdAndRemove({ _id: id })
			.exec();
		return deletedUser;
	}
}