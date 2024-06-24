import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) {}

  async ingresar() {
    // Validar campos
    if (this.validarUsuario() && this.validarContrasena()) {
      if (this.authService.login(this.usuario, this.contrasena)) {
        this.router.navigate(['/home']);
      } else {
        this.mostrarAlerta('Usuario o contraseña inválidos.');
      }
    } else {
      this.mostrarAlerta('Usuario o contraseña inválidos.');
    }
  }

  validarUsuario(): boolean {
    return this.usuario.length >= 3 && this.usuario.length <= 8;
  }

  validarContrasena(): boolean {
    return /^\d{4}$/.test(this.contrasena);
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Cerrar']
    });
    await alert.present();
  }
}
