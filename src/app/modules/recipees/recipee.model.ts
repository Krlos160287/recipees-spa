export interface RecetaModel {
    id?: string;
    nombre: string;
    products: Producto[];
    steps: string;
}

export interface Producto {
    nombre: string;
    cantidad: number | undefined;
    unidadMedida: string | undefined;
  }