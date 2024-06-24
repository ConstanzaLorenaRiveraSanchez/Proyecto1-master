import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./compras/compras.module').then(m => m.ComprasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tareas',
    loadChildren: () => import('./tareas/tareas.module').then(m => m.TareasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recordatorios',
    loadChildren: () => import('./recordatorios/recordatorios.module').then(m => m.RecordatoriosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
