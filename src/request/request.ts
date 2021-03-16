import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const VIACEP_URL = 'https://viacep.com.br/ws';

export class Request {
  instanceConfig: AxiosRequestConfig;
  instance: AxiosInstance;

  constructor() {
    this.instanceConfig = {
      baseURL: VIACEP_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.instance = axios.create(this.instanceConfig);
  }

  async get(url: string, options: Object): Promise<any> {
    return this.instance
      .get(url, options)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
