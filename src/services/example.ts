/**
 * ------------------------------------------
 *	Configurar servicio
 * ------------------------------------------
 */

import {
  useService,
  useFormData,
  type UltrasonidoPedidoCrearConMedia,
} from './index';

/**
 * ------------------------------------------
 *	Usando el servicio
 * ------------------------------------------
 */

const $service = useService();

/**
 * Iniciar sesion
 */
async function login() {
  const { data } = await $service.usuarios.auth.login({
    telefono: '5254213546',
    password: 'top_secret',
  });
  console.log({
    usuario: data.data,
    auth_token: data.auth_token,
  });
}

/**
 * Crear nuevo usuario
 */
async function register() {
  const { data } = await $service.usuarios.auth.register({
    nombre: 'Elon',
    apellido_paternal: 'Musk',
    apellido_maternal: 'Sony',
    email: 'elon@tesla.com',
    telefono: '5254213546',
    password: 'top_secret',
    password_confirmation: 'top_secret',
  });

  console.log({
    usuario: data.data,
    auth_token: data.auth_token,
  });
}

/**
 * Crear nuevo ultrasonido
 */
async function crearUltrasonido() {
  // al enviar datos que tengan archivos hay que serializarlos

  const { serialize } = useFormData();

  const crearUltrasonido: UltrasonidoPedidoCrearConMedia = serialize({
    descripcion: 'Ultrasonido',
    telefono_paciente: '5254213546',
    titulo: 'Ultrasonido intestinal',
    images: [],
    videos: [],
  });

  const { data } = await $service.ultrasonido.create(crearUltrasonido);
}
