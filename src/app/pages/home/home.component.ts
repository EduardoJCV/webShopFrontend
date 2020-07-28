import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  parameters;

  productos = [];

  cargado = false;

  constructor( private route: ActivatedRoute, private backend: BackendService ) {
    this.cargar();
   }

  ngOnInit(): void {
    
  }

  cargar(){
    this.route.params.subscribe(res => {
      this.parameters = res;
    });
    this.backend.getCincoProductos().subscribe( (res:any) =>{
      this.productos = res;
      this.cargado = true;
    });
  }

}
