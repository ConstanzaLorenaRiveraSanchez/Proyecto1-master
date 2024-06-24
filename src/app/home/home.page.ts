import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationController, IonTabs } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slideInElement', { read: ElementRef, static: true }) slideInElement!: ElementRef;
  @ViewChild(IonTabs, { static: true }) tabs!: IonTabs;

  usuario: string = '';

  constructor(private animationCtrl: AnimationController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
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
      console.log('Animación completada');
    });
  }

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
