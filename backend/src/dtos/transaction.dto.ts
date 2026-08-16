import { Field, GraphQLISODateTime, InputType } from "type-graphql";
import { TransactionType } from "../../generated/prisma/enums.js";

@InputType()
export class CreateTransactionRequest {
  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;

  @Field(() => TransactionType)
  type!: TransactionType;
}

@InputType()
export class UpdateTransactionRequest {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date;

  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;
}
