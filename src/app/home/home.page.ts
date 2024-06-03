import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slideInElement', { read: ElementRef, static: true }) slideInElement!: ElementRef;

  usuario: string = ''; // Inicialización de la propiedad usuario
  integrantes: any[] = []; // Inicialización del arreglo de integrantes

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
    // Obtener el usuario del estado de la navegación
    const state = window.history.state;
    if (state && state.usuario) {
      this.usuario = state.usuario;
    }

    this.slideInAnimation();
  }

  slideInAnimation() {
    const animation = this.animationCtrl.create()
      .addElement(this.slideInElement.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)');

    animation.play().then(() => {
      console.log('Animación completada');
    });
  }
}
