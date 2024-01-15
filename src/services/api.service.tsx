import axios, { AxiosError } from 'axios';
import { SERVER_BASE_URL } from '../constants/db.constants.tsx';


export default class ApiService {
  static instance: ApiService;
  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    }
    ApiService.instance = this;
  }

  static getInstance = () => ApiService.instance || new ApiService();

  static getServerUrl = () => SERVER_BASE_URL /*SERVER_URLS[process.env.NODE_ENV as Environment]*/;

  get = async (partialUrl: string, params: any = {}): Promise<any> => {
    const completeUrl = ApiService.getServerUrl() + partialUrl;
    try {
      const result = await axios.get(completeUrl, { params: params });
      return result;
    } catch (error: any) {
      return this.handleResponseError(error);
    }
  };

  put = async (partialUrl: string, data: Record<string, any> = {}): Promise<any> => {
    const completeUrl = ApiService.getServerUrl() + partialUrl;
    try {
      const res = await axios.put(completeUrl, data);
      return await Promise.resolve(res);
    } catch (error: any) {
      return this.handleResponseError(error);
    }
  };

  post = async (partialUrl: string, data: Record<string, any> = {}): Promise<any> => {
    const completeUrl = ApiService.getServerUrl() + partialUrl;
    try {
      const res = await axios.post(completeUrl, data);
      return await Promise.resolve(res);
    } catch (error: any) {
      return this.handleResponseError(error);
    }
  };

  handleResponseError = (error: AxiosError<any>) => {
    const apiError = {
      message: error.message,
      data: error?.response?.data,
      statusCode: error?.response?.status
    };
    return Promise.reject(apiError);
  };
}
