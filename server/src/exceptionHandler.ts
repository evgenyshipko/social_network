import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import axios from "axios";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

const getMessage = <T extends Error>(error: T, status: HttpStatus): string => {
  if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    return "Internal server error";
  }
  if (error instanceof HttpException) {
    const message = (error.getResponse() as { message: string[] | string })
      ?.message;
    if (Array.isArray(message)) {
      return message.join(",");
    }
    return message;
  }
  return error?.message;
};

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch<T extends Error>(exception: T, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;
    const request = ctx.getRequest() as Request;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = getMessage(exception, status);

    const contexts = {
      request: {
        url: request.url,
        method: request.method,
        params: request.params,
        body: JSON.stringify(request.body),
      },
      response: undefined,
      sentryExceptionId: undefined,
      query: undefined,
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (axios.isAxiosError(exception)) {
        const { baseURL, url, method } = exception.config;

        const requestData = exception.config?.data;

        const responseData = exception.response?.data;

        contexts.response = {
          url: baseURL + url,
          method,
          requestData: JSON.stringify(requestData),
          responseData: JSON.stringify(responseData),
        };
      }

      if (exception instanceof QueryFailedError) {
        contexts.query = exception.query;
      }
    }

    Logger.error(exception.stack, JSON.stringify(contexts, null, 4));

    response.status(status).send(message);
  }
}
