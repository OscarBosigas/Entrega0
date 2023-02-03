import { Component, OnInit } from '@angular/core';
import { Evento } from '../eventos/evento';
import { UsuarioService } from './usuario.service';
import { EventosService } from '../eventos/eventos.service';
import { Usuario } from '../home/usuario';
import { HomeComponent } from '../home/home.component';
import { LogInService } from '../home/login.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor(private home : LogInService, private usuarioService: UsuarioService, private eventoService: EventosService) { }

  eventos: Array<Evento> = [new Evento("Evento 1","Paipa","Calle 27","2022","2022",1,1,1)];
  categoria: string[] = [''];
  tipo: string[] = [''];

  nombre = ''
  contrasena = ''

  usuario : Usuario = new Usuario(0,"","")

  ngOnInit(): void {
    this.nombre = this.home.getNombre2();
    this.contrasena = this.home.getCon2();
    this.usuario = new Usuario(0, this.nombre, this.contrasena);
    console.log(this.usuario)
    this.home.getUsuario(this.usuario)
    .subscribe(res =>{
      this.usuario = res;
      alert(this.usuario.id)
    })
  }

}
