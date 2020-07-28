import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  forma: FormGroup;

  logData = {
    email: '',
    password: ''
  }

  constructor( private fb: FormBuilder, private backend: BackendService, private router:Router ) { 
    this.crearForm();
  }

  noValido(campo:string){
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  siValido(campo:string){
    return this.forma.get(campo).valid && this.forma.get(campo).touched;
  }

  crearForm(){
    this.forma = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  guardar(){
    if ( this.forma.invalid ) {
      Object.values( this.forma.controls ).forEach( control =>{
        control.markAllAsTouched();
      })
      return false;
    }

    // this.backend.login(forma.controls)
    this.logData = {
      email: this.forma.controls['email'].value,
      password: this.forma.controls['password'].value
    }
    
    this.backend.login(this.logData).subscribe( (res:any)=>{
      if ( res ) {
        console.log(res);
        localStorage.setItem('usuario', JSON.stringify(res));

        this.router.navigateByUrl('perfil/perfil-info');
        location.reload();
      }
    })
  }

}
