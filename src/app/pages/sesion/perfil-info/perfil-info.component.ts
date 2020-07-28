import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-perfil-info',
  templateUrl: './perfil-info.component.html',
  styleUrls: ['./perfil-info.component.css']
})
export class PerfilInfoComponent implements OnInit {

  usuario = JSON.parse(localStorage.getItem('usuario'));
  
  parameters;
  favoritos = [];
  productos = [];
  pedidos = [];

  cargado = false;

  constructor( private router: Router, private route: ActivatedRoute, private backend: BackendService ) {
    if ( localStorage.getItem('favoritos') ) {
      this.favoritos = JSON.parse(localStorage.getItem('favoritos'));
    }
    this.cargar();
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('home');
  }


  cargar(){
    this.route.params.subscribe(res => {
      this.parameters = res;
    });
    

    this.backend.getProductoInfo(this.favoritos).subscribe( (res:any) =>{
      this.productos = res;
      console.log(res);
      
    });

    
    console.log('pedido')
    this.backend.getPedidos().subscribe( (res:any) =>{
      this.pedidos = res;
      console.log(res);
      this.cargado = true;
    })
    
  }

}
