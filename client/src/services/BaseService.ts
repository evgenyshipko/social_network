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
    if (error.response.status === HttpCode.Unauthorized) {
      if (
        stores?.AuthStore?.user &&
        Object.keys(stores.AuthStore.user).length
      ) {
        stores.AuthStore.logOut();
      }

      return;
    }

    stores.NoticeStore.initError(error.response.data);

    return Promise.reject(error);
  }
);

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

    return this.api.get(this.buildUrl(newUrl), options);
  }

  protected static post<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.api.post(this.buildUrl(url), data, options);
  }

  protected static put<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.api.put(this.buildUrl(url), data, options);
  }

  protected static patch<T>(
    url: string,
    data?: Nullable<unknown>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.api.patch(this.buildUrl(url), data, options);
  }

  protected static delete<T>(
    url: string,
    data?: Nullable<ParsedUrlQueryInput>,
    options?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.api.delete(this.buildUrl(url), { ...options, data });
  }
}
