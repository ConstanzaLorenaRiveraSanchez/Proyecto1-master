import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, IonTabs } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { ApisService } from '../services/apis.service'; 
import { ClimaModel } from '../models/clima.model'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slideInElement', { read: ElementRef, static: true }) slideInElement!: ElementRef;
  @ViewChild(IonTabs, { static: true }) tabs!: IonTabs;

  usuario: string = '';
  temperatura: string = '';
  headerTitle: string = ''; 


  constructor(private apisService: ApisService, private animationCtrl: AnimationController, private authService: AuthService, private router: Router, ) { }

  ngOnInit() {
    this.checkUsuarioAndAnimate();
    this.printCurrentPosition();
  }

  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
  
      // Obtener el clima utilizando las coordenadas
      const clima = await this.apisService.obtenerClima(
        coordinates.coords.longitude.toString(),
        coordinates.coords.latitude.toString()
      );
  
      // Actualizar la temperatura en tu componente
      this.temperatura = clima.current_weather.temperature.toString();
    } catch (error) {
      console.error('Error intentando encontrar geolocalizacion', error);
    }
  }
  

  checkUsuarioAndAnimate() {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.usuario = usuario;
    } else {
      this.router.navigate(['/login']);
    }

    this.slideInAnimation();
  }

  slideInAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.slideInElement.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)');

    animation.play().then(() => {
      console.log('Slide in animation completed');
    });
  }

  handleTabChange() {
    this.tabs.ionTabsDidChange.subscribe(() => {
      const selectedTab = this.tabs.getSelected();
      switch (selectedTab) {
        case 'home':
          this.headerTitle = 'Home';
          break;
        case 'tareas':
          this.headerTitle = 'Tareas';
          break;
        case 'compras':
          this.headerTitle = 'Compras';
          break;
        case 'recordatorios':
          this.headerTitle = 'Recordatorios';
          break;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
