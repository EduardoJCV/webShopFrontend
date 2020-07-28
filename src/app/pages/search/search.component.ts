import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
    this.backend.getProducto(this.parameters.param).subscribe( (res:any) =>{
      this.productos = res;
      this.cargado = true;
    })
  }

}
