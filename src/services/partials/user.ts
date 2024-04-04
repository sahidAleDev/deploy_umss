import type {
  PaginatedData,
  Usuario,
  UsuarioLogin,
  UsuarioPedidoFiltrar,
  UsuarioRegister,
  UsuarioRespuestaAuth,
} from '../types';
import type { AxiosInstance } from 'axios';

export function setupUser(api: AxiosInstance) {
  const baseURL = '/usuarios';

  return {
    auth: {
      current: () => api.get<Usuario>(baseURL),
      login: (params: UsuarioLogin) =>
        api.post<UsuarioRespuestaAuth>(`${baseURL}/auth/login`, params),
      register: (params: UsuarioRegister) =>
        api.post<UsuarioRespuestaAuth>(`${baseURL}/auth/register`, params),
    },

    filtrar: (params: UsuarioPedidoFiltrar) =>
      api.get<PaginatedData<Usuario>>(`${baseURL}/filtrar`, { params }),
  };
}
