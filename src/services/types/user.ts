import type { PaginationParams } from './pagination';

/**
 * User
 */
export interface Usuario {
  id: number;
  nombre: string;
  apellido_maternal: string;
  apellido_paternal: string;
  email: string | null;
  telefono: string;
  fecha_nacimiento: string | null
}

export interface UsuarioLogin {
  telefono: string;
  password: string;
}

export interface UsuarioRegister {
  nombre: string;
  apellido_maternal: string;
  apellido_paternal: string;
  email: string | null;
  telefono: string;
  password: string;
  password_confirmation: string;
}

/**
 * Responses
 */
export interface UsuarioRespuestaAuth {
  data: Usuario;
  auth_token: string;
}

export interface UsuarioPedidoFiltrar extends PaginationParams {
  email?: string;
  telefono?: string;
  search?: string;
}
