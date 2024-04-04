import type { Media } from './media';
import type { PaginationParams } from './pagination';
import type { Usuario } from './user';

export interface Ultrasonido {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha_creacion: string;
}

export interface UltrasonidoConMedia extends Ultrasonido {
  media: Media[];
  paciente: Usuario;
}

export interface UltrasonidoPedidoCrear {
  telefono_paciente: string;
  titulo: string;
  descripcion: string | null;
}

export type UltrasonidoPedidoActualizar = Partial<
  Omit<Ultrasonido, 'id' | 'fecha_creacion' | 'paciente'>
>;

export interface UltrasonidoPedidoCrearConMedia extends UltrasonidoPedidoCrear {
  images?: File[];
  videos?: File[];
}

export interface UltrasonidoPedidoFiltrar extends PaginationParams {
  telefono_paciente?: string;
  search?: string;
}
