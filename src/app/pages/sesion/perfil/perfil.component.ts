import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  logueado: boolean;

  constructor( private router: Router ) {
    if ( localStorage.getItem('usuario') ) {
      this.logueado = true;

      this.router.navigateByUrl('perfil/perfil-info');
    }else{
      
      this.logueado = false;
      
      this.router.navigateByUrl('perfil/login');
    }
   }

  ngOnInit(): void {

  }

}
