import { Field, InputType, ObjectType } from "type-graphql";
import { UserModel } from "../models/user.model.js";

@InputType()
export class RegisterRequest {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class LoginRequest {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token!: string;

  @Field(() => String)
  refreshToken!: string;

  @Field(() => UserModel)
  user!: UserModel;
}
