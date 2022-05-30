import {
  OpenAPI,
  AuthenticateRequest,
  AuthenticateResponse,
  User,
  UserService,
  ApiError,
} from "../openapi";

const { postUserAuthenticate, getUserCurrent } = UserService;

OpenAPI.BASE = "https://localhost:7084";
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const authenticate = async (
  request: AuthenticateRequest
): Promise<AuthenticateResponse> => {
  try {
    let response = await postUserAuthenticate(request);

    let bearer = "Bearer: " + response.token;
    OpenAPI.TOKEN = bearer;
    localStorage.setItem("bearer", bearer);
    return response;
  } catch (error) {
    logout();
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
};

export const currentUser = async (): Promise<User | Error> => {
  try {
    let response = await getUserCurrent();
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      logout();
    }
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    return Error(message);
  }
};

export const logout = () => {
  OpenAPI.TOKEN = "";
  localStorage.setItem("bearer", "");
};
