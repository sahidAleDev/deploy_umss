import type { AxiosInstance } from 'axios';
import { defaultTokenHandler, initApi } from './utils';
import { setupUltrasonido, setupMultimedia, setupUser } from './partials';

export function setup(_api?: AxiosInstance) {
  const api = _api ?? initApi({ appToken: '', baseURL: 'https://umss-api.terio.xyz/api' });

  return {
    media: setupMultimedia(api),
    ultrasonido: setupUltrasonido(api),
    usuarios: setupUser(api),
  };
}


/**
 * useService
 * @returns
 */
export function useService() {
  /**
   * Instancia de Axios
   */
  const axiosInstance: AxiosInstance = initApi({
    appToken: 'pwa-cliente', // Token secreto que identifica la app
    baseURL: 'https://umss-api.terio.xyz/api', // Url base de la API
    tokenHandler: defaultTokenHandler(),
  });

  return setup(axiosInstance);
}

export * from './types';
export * from './utils';

export default setup;
