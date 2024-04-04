import type { Media, MediaPedidoCrear, MediaPedidoFiltrar } from '../types';
import { generateCrud } from '../utils';
import type { AxiosInstance } from 'axios';

/**
 * setupMultimedia
 * @param api
 * @returns
 */
export function setupMultimedia(api: AxiosInstance) {
  const baseURL = '/medias';

  const { update, remove, ...crud } = generateCrud<
    Media,
    MediaPedidoCrear,
    null,
    MediaPedidoFiltrar
  >({
    api,
    baseURL,
  });

  return {
    ...crud,
  };
}
