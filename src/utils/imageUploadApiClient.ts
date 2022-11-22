import axios, { AxiosRequestConfig } from 'axios';

export interface IApiClientConfig {
  data: File;
  customConfig?: any;
}

export async function imageUploadApiClient<D>(
  url: string,
  config: IApiClientConfig,
): Promise<D> {
  const { data, customConfig } = config;

  const requestConfig: AxiosRequestConfig = {
    method: 'PUT',
    data,
    url,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    ...customConfig,
  };

  try {
    const response = await axios(requestConfig);

    return response.data;
  } catch (error) {
    throw error;
  }
}
