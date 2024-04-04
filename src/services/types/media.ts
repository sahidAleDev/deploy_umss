import type { PaginationParams } from './pagination';

export interface Media {
  descripcion: string | null;
  id: number;
  tipo: 'IMAGE' | 'VIDEO';
  titulo: string;
  url: string;
}

export interface MediaPedidoCrear {
  ultrasonido_id: number;
  titulo: string;
  descripcion: string | null;
  video?: File;
  image?: File;
}

export interface MediaPedidoFiltrar extends PaginationParams {
  ultrasonido_id?: number;
  search?: string;
}
