import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/sesion/perfil/perfil.component';
import { PerfilInfoComponent } from './pages/sesion/perfil-info/perfil-info.component';
import { LoginComponent } from './pages/sesion/login/login.component';
import { SingupComponent } from './pages/sesion/singup/singup.component';
import { SearchComponent } from './pages/search/search.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CarritoComponent } from './pages/carrito/carrito.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent, children: [
    { path: 'perfil-info', component: PerfilInfoComponent },
    { path: 'singup', component: SingupComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
  ]},
  { path: 'search/:param', component: SearchComponent },
  { path: 'categoria/:name/:id', component: CategoriaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
