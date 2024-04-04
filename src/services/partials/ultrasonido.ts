import type {
  PaginatedData,
  Ultrasonido,
  UltrasonidoConMedia,
  UltrasonidoPedidoActualizar,
  UltrasonidoPedidoCrearConMedia,
  UltrasonidoPedidoFiltrar,
} from '../types';
import type { AxiosInstance } from 'axios';

/**
 * setupUltrasonido
 * @param api
 * @returns
 */
export function setupUltrasonido(api: AxiosInstance) {
  const baseURL = '/ultrasonidos';

  return {
    create: (params: UltrasonidoPedidoCrearConMedia) =>
      api.post<UltrasonidoConMedia>(baseURL, params),
    filter: (params: UltrasonidoPedidoFiltrar) =>
      api.get<PaginatedData<Ultrasonido>>(baseURL, { params }),
    show: (id: number, secret: string) => api.get<UltrasonidoConMedia>(`${baseURL}/${id}`, {
      params: {
        secret
      }
    }),
    update: (id: number, params: UltrasonidoPedidoActualizar) =>
      api.patch(`${baseURL}/${id}`, params),
  };
}
