import { unwrapResolverError } from "@apollo/server/errors";
import type { GraphQLFormattedError } from "graphql";

const UNKNOWN_ERROR_MESSAGE = "Unknown error, please contact our support";

class UserFacingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserFacingError";
  }
}

const logUnknownGraphqlError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.stack ?? error.message);
    return;
  }

  console.error(error);
};

const formatGraphqlError = (
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError => {
  const originalError = unwrapResolverError(error);

  if (originalError instanceof UserFacingError) {
    return {
      message: originalError.message,
    };
  }

  if (formattedError.extensions?.code !== "INTERNAL_SERVER_ERROR") {
    return {
      message: formattedError.message,
    };
  }

  logUnknownGraphqlError(originalError);

  return {
    message: UNKNOWN_ERROR_MESSAGE,
  };
};

export { formatGraphqlError, UNKNOWN_ERROR_MESSAGE, UserFacingError };
