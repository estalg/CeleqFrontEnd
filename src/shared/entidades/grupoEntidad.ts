import {PermisoEntidad} from './permisoEntidad';
import {UsuarioEntidad} from './usuarioEntidad';

export class GrupoEntidad {
  descripcion: string;
  permisos: PermisoEntidad[];
  usuarios: UsuarioEntidad[];
}
