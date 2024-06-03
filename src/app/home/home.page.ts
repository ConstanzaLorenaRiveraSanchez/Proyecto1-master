// home.page.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slideInElement', { read: ElementRef, static: true }) slideInElement!: ElementRef;
  @ViewChild(IonTabs, { static: true }) tabs!: IonTabs; // Inicializar la referencia a los tabs

  usuario: string = ''; // Inicialización de la propiedad usuario

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

  // Método para manejar la animación al cambiar de tab
  handleTabChange() {
    setTimeout(() => {
      const tabButton = document.querySelector('.tab-selected');
      if (tabButton) {
        const animation = this.animationCtrl.create()
          .addElement(tabButton as HTMLElement)
          .duration(1000)
          .fromTo('transform', 'scale(0.5)', 'scale(1)');

        animation.play().then(() => {
          console.log('Animación completada');
        });
      }
    });
  }
}
