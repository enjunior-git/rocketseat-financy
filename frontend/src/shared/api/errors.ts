import { CombinedGraphQLErrors } from "@apollo/client/errors";

const UNKNOWN_ERROR_MESSAGE = "Unknown error, please contact our support";

const getApiErrorMessage = (error: unknown) => {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors[0]?.message || UNKNOWN_ERROR_MESSAGE;
  }

  return UNKNOWN_ERROR_MESSAGE;
};

const toApiError = (error: unknown) => new Error(getApiErrorMessage(error));

export { getApiErrorMessage, toApiError, UNKNOWN_ERROR_MESSAGE };
