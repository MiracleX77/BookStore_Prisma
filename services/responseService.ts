import {ResponseInterface} from '../interfaces/responseInterface';


export const responser = (status: boolean, message: string, data?: any): ResponseInterface => {
    const response: ResponseInterface = {
        status: status,
        message: message,
        data: data
    }
    return response;
}