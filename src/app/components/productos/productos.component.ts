import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @Input('productosArr') productosArr;
  @Input('categoria') categoria;

  favoritos = [];
  carritoList = [];
  carrito = [];

  categorias = false;

  constructor() { 
    if ( localStorage.getItem('favoritos') ) {
      this.favoritos = JSON.parse(localStorage.getItem('favoritos'));
    }
    if ( localStorage.getItem('carrito') ) {
      this.carrito = JSON.parse(localStorage.getItem('carrito'));

      this.carrito.filter( (prod) => { 
        this.carritoList.push(prod.id);
      });
    }
  }

  ngOnInit(): void {
    console.log(this.categoria)
    if (this.categoria) {
      this.categorias = true;
    }
  }

  changeFav(id:string){
    if ( this.favoritos.indexOf(id) !== -1 ) {
      this.favoritos.splice( this.favoritos.indexOf(id), 1 );
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }else{
      this.favoritos.push(id);
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }
  }

  changeCar(id:string){
    let carritoAct = [];

    if ( this.carritoList.indexOf(id) !== -1 ) {

      this.carritoList.splice( this.carritoList.indexOf(id), 1 );
      
      this.carrito.filter( (prod) => {
        if (prod.id == id) {
          
        }else{
          carritoAct.push( prod );
        }
      });
      localStorage.setItem('carrito', JSON.stringify(carritoAct));
      this.carrito = carritoAct;
    }else{
      this.carritoList.push(id);

      this.carrito.push({
        id: id,
        cantidad: 1
      });

      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }


}
