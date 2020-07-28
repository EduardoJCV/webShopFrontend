import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  @Input() parameters;

  suscripcion;

  productos = [];

  cargado = false;

  constructor( private route: ActivatedRoute, private backend: BackendService ) {

  }

  

  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.route.params.subscribe(res => {
      this.parameters = res;
    });
    this.suscripcion = this.backend.getCategoria(this.parameters['id']).subscribe( (res:any)=>{
      this.productos = res;
      this.cargado = true;
    });
    console.log(this.parameters)
  }

}
