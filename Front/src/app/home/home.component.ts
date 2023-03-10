import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from './login.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private login : LogInService, private route : Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.login.logIn(new Usuario(0,this.nombre, this.contrasena))
    .subscribe(res =>{
      this.route.navigate(['crud'])
    }, error => {
      this.errorMessage = error;
      alert(this.errorMessage)
    }); 
  }

  onSingIn() {
    this.login.singIn(new Usuario(0,this.nombre, this.contrasena))
    .subscribe(res =>{
      alert('Registrado!')
      this.route.navigate([''])
    }, error => {
      this.errorMessage = error;
      alert(this.errorMessage)
    }); 
  }

}
