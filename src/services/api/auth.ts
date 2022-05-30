import {
    OpenAPI,
    AuthenticateRequest,
    AuthenticateResponse,
    User,
    UserService,
  } from '../openapi';
  
const { postUserAuthenticate, getUserCurrent } = UserService;

OpenAPI.BASE = 'https://localhost:7084';
OpenAPI.TOKEN = localStorage.getItem("bearer") ?? "";

export const authenticate = async (request: AuthenticateRequest): Promise<AuthenticateResponse> => {
    try {
        let response = await postUserAuthenticate(request);
        let bearer = "Bearer: " + response.token;
        OpenAPI.TOKEN = bearer
        localStorage.setItem('bearer', bearer);
        return response;
    } catch (error) {
        OpenAPI.TOKEN = ''
        console.log(error);
        localStorage.setItem('bearer', "");
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        throw new Error(message);
    }
};

export const currentUser = async(): Promise<User> => {
    try {
        console.log(OpenAPI);
        let user = await getUserCurrent();
        console.log(user);
        return user;
    } catch(error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        throw new Error(message)
    }
}

export const logout = async () => {
    OpenAPI.TOKEN = "";
    localStorage.setItem('bearer', "");
};