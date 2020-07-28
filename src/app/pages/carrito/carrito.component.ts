import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  parameters;
  carrito = [];
  productos = [];

  forma: FormGroup

  total = 0;

  cargado = false;

  constructor( private  fb: FormBuilder , private router: Router, private route: ActivatedRoute, private backend: BackendService ) {
    if ( localStorage.getItem('carrito') ) {
      this.carrito = JSON.parse(localStorage.getItem('carrito'));
    }
    this.cargar();
   }

  ngOnInit(): void {
    this.crearForm();
  }

  logout(){
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('home');
  }

  crearForm(){
    this.forma = this.fb.group({
      estado: ['', 
        [
          Validators.required,
          Validators.minLength(2)
      ]],
      ciudad: ['', 
        [
          Validators.required,
          Validators.minLength(3)
      ]],
      direccion: ['', 
      [
        Validators.required,
        Validators.minLength(4)
    ]],
    });
  }

  noValido(campo:string){
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  siValido(campo:string){
    return this.forma.get(campo).valid && this.forma.get(campo).touched;
  }

  cargar(){
    this.route.params.subscribe(res => {
      this.parameters = res;
    });
    let subscrupcion;
    this.backend.postProductoInfo(this.carrito).subscribe( (res:any) =>{
      let resModif = [];
      for (let i = 0; i < res.length; i++) {
        let elEdit = res[i];
        this.carrito.filter( (prod) => { 
          if (prod.id == elEdit.id) {
            elEdit.cantidad = prod.cantidad;
          }
        });
        console.log(elEdit);
        resModif.push(elEdit);
      }
      this.productos = resModif;
      console.log(res);
      for (let i = 0; i < this.productos.length; i++) {  
        this.total += (parseInt( this.productos[i].oferta) * parseInt( this.productos[i].cantidad));
      }
      console.log('el total es: '+this.total);
      this.cargado = true;
    });
  }

  change(val, precio, id){
    let newCar = [];
    this.carrito.filter( (prod) => { 
      if (prod.id == id) {
        newCar.push({
          id: prod.id,
          cantidad: parseInt(val)
        });
      } else {
        newCar.push({
          id: prod.id,
          cantidad: parseInt(prod.cantidad)
        });
      }
    });
    console.log(newCar);
    this.carrito = newCar;
    localStorage.setItem('carrito', JSON.stringify(newCar));

   this.total = 0;
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].id == id ) {
        this.total += (parseInt(precio) * parseInt(val));
      }else{
        this.total += parseInt(this.productos[i].oferta);
      }
    }
  }

  direccion = {
    estado: '',
    ciudad: '',
    direccion: ''
  }

  pagar(){

    // console.log(this.forma);
    if ( this.forma.invalid ) {
      Object.values( this.forma.controls ).forEach( control =>{
        control.markAllAsTouched();
      })
      return false;
    }
    // console.log(this.forma);

    this.direccion = this.forma.value;

    this.backend.pagarCarrito(this.carrito, this.direccion).subscribe((res:any[]) =>{
      console.log(res);
      let error = false;
      if ( res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          if (res[i] == true) {
            error = true;
          }else {
            error = false;
          }
        }
      }else{
        alert('Error al pagar');
      }
      if (error == false) {
        alert('Pagado Correctamente');
        localStorage.removeItem('carrito');
        location.reload();
      }else{
        alert('Error al pagar');
      }
    })
  }

}
