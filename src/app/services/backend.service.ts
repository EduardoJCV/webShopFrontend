import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor( private http: HttpClient ) { }

  url = 'http://localhost:80/shopBackend/api/';

  getUsers(){
    return this.http.get(`${this.url}userApi.php?id=asd`);
  }

  login(data){
    return this.http.get(`${this.url}userApi.php?email=${data.email}&password=${data.password}`);
  }
  registrar(data){
    return this.http.post(`${this.url}userApi.php`, {
      action: 'registrar',
      data: data
    });
  }

  getCategorias(){
    return this.http.get(`${this.url}categoriasApi.php`);
  }

  getCategoria(id:number){
    return this.http.get(`${this.url}productoApi.php?param=${id}&type=categoria`);
  }

  getProducto(param:string){
    return this.http.get(`${this.url}productoApi.php?param=${param}&type=search`);
  }
  postProductoInfo(data){
    return this.http.post(`${this.url}productoApi.php`, {
      action: 'getProdsID',
      data: data
    });
  }
  getProductoInfo(data){
    return this.http.get(`${this.url}productoApi.php?param=${data}&type=solo`);
  }
  getTodosProductos(){
    return this.http.get(`${this.url}productoApi.php?param=si&type=all`);
  }
  getCincoProductos(){
    return this.http.get(`${this.url}productoApi.php?param=no&type=all`);
  }
  pagarCarrito(list: string[], direccion){
    return this.http.post(`${this.url}pedidoApi.php`, {
      action: 'pagarCarrito',
      productos: list,
      direccion: direccion,
      userToken: JSON.parse(localStorage.getItem('usuario'))
    });
  }
  getPedidos(){
    console.log('asdasd')
    return this.http.post(`${this.url}pedidoApi.php`, {
      action: 'getPedidos',
      userToken: JSON.parse(localStorage.getItem('usuario'))
    });
  }
}
