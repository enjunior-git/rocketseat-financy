import { Query, Resolver } from "type-graphql";

@Resolver()
export class HealthcheckResolver {
  @Query(() => String)
  healthcheck() {
    return "ok";
  }
}
