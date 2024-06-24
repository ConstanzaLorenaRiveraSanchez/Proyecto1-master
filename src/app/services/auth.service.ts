import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(usuario: string, contrasena: string): boolean {
    if (usuario === 'Coni' && contrasena === '1234') {
      // Guardar el usuario en el localStorage
      localStorage.setItem('usuario', usuario);
      return true;
    }
    return false;
  }

  logout(): void {
    // Eliminar el usuario del localStorage
    localStorage.removeItem('usuario');
  }

  isLoggedIn(): boolean {
    // Verificar si el usuario existe en el localStorage
    return !!localStorage.getItem('usuario');
  }

  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }
}
