import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserRequest {
  @Field(() => String)
  name!: string;
}
