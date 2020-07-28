import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias = [];

  constructor( private backend: BackendService, private router:Router) { }

  ngOnInit(): void {

    this.obtenerCategorias();

  }

  obtenerCategorias(){
    this.backend.getCategorias().subscribe( (res:any[]) =>{
      this.categorias = res;
    })
  }

  buscar(searchText:string){
    this.router.navigate(['search', searchText]);
  }

  busCat(nombre:string, id:number){
    this.router.navigate(['categoria',nombre, id]);
    setTimeout(() => {
      location.reload();
    }, 500);
  }

}
