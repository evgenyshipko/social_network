import queryString, { ParsedUrlQueryInput } from "querystring";
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { config } from "../../config";
import { HttpCode, Nullable } from "../types";
import { stores } from "@store";

export const axiosInstance: AxiosInstance = axios.create({
  timeout: 300000,
  headers: { Accept: "application/json" },
  baseURL: config.SERVER_HOST,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    if (
      error.response.status === HttpCode.Unauthorized &&
      stores?.AuthStore?.user &&
      Object.keys(stores.AuthStore.user).length
    ) {
      stores.AuthStore.logOut();
    }

    return Promise.reject(error);
  }
);

const errorHandler = <T = unknown>(
  axiosPromise: AxiosPromise<T>,
  context: string
  // eslint-disable-next-line consistent-return
): AxiosPromise<T> =>
  axiosPromise.catch((error) => {
    // if (!error.response?.data?.disableGlobalNotice) {
    //   stores.NoticeStore.initError(error.response.data.message, {
    //     context,
    //   });
    // }
    throw error;
  });

export abstract class ServiceBase {
  protected static BASE_URL: string;

  protected static api = axiosInstance;

  public static buildUrl(url: string): string {
    return `${this.BASE_URL}${url}`;
  }

  protected static get<T>(
    url: string,
    data?: Nullable<ParsedUrlQueryInput>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    let newUrl: string = url;

    if (data && Object.keys(data).length) {
      newUrl = `${newUrl}?${queryString.stringify(data)}`;
    }

    const promise = this.api.get(this.buildUrl(newUrl), options);

    const context = `METHOD: get, URL: ${url}`;

    return errorHandler(promise, context);
  }

  protected static post<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    const promise = this.api.post(this.buildUrl(url), data, options);

    const context = `METHOD: post, URL: ${url}`;

    return errorHandler(promise, context);
  }

  protected static put<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    const promise = this.api.put(this.buildUrl(url), data, options);

    const context = `METHOD: put, URL: ${url}`;

    return errorHandler(promise, context);
  }

  protected static patch<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    const promise = this.api.patch(this.buildUrl(url), data, options);

    const context = `METHOD: patch, URL: ${url}`;

    return errorHandler(promise, context);
  }

  protected static delete<T>(
    url: string,
    data?: Nullable<ParsedUrlQueryInput>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    const promise = this.api.delete(this.buildUrl(url), { ...options, data });

    const context = `METHOD: delete, URL: ${url}`;

    return errorHandler(promise, context);
  }
}
