import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from "type-graphql";
import { Role } from "../../generated/prisma/enums.js";

registerEnumType(Role, {
  name: "Role",
});

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  password?: string | null;

  @Field(() => Role)
  role!: Role;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
