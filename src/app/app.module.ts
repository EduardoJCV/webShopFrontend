import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/sesion/login/login.component';
import { SingupComponent } from './pages/sesion/singup/singup.component';
import { PerfilComponent } from './pages/sesion/perfil/perfil.component';
import { PerfilInfoComponent } from './pages/sesion/perfil-info/perfil-info.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SingupComponent,
    PerfilComponent,
    PerfilInfoComponent,
    SearchComponent,
    ProductoComponent,
    ProductosComponent,
    CategoriaComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
