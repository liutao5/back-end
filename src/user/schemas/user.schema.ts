import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ unique: true, required: true })
	account: string;

	@Prop({ required: true })
	password: string;

	@Prop()
	authList: string[];

	@Prop()
	name: string;

	@Prop()
	age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
