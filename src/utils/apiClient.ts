import axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from 'config/apiConfig';

export interface IApiClientConfig {
  data?: any;
  token?: string;
  headers?: { [key: string]: string };
  customConfig?: any;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
}

export async function apiClient<D>(
  endpoint: string,
  config: IApiClientConfig,
): Promise<D> {
  const { data, token, headers: customHeaders, customConfig, method } = config;

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(data ? { 'Content-Type': 'application/json' } : {}),
    ...customHeaders,
  };

  const requestConfig: AxiosRequestConfig = {
    method: method ? method : 'GET',
    headers,
    data,
    baseURL: API_URL,
    url: endpoint,
    ...customConfig,
  };

  try {
    const response = await axios(requestConfig);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 && !token) {
        throw new Error('Unauthorized - have you forgotten to pass a token?');
      }
    }

    throw error;
  }
}
