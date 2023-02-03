import { Component, OnInit } from '@angular/core';
import { Evento } from '../eventos/evento';
import { CrudService} from './crud.service';
import { EventosService } from '../eventos/eventos.service';
import { Usuario } from '../home/usuario';
import { HomeComponent } from '../home/home.component';
import { LogInService } from '../home/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor(private home : LogInService, private crudService: CrudService, private eventoService: EventosService, private route: Router) { }

  eventos: Array<Evento> = [new Evento(0,"Evento 1","Paipa","Calle 27","2022","2022",1,1,1)];
  categoria: string[] = [''];
  tipo: string[] = [''];

  nombre = ''
  contrasena = ''
  id = 0;
  usuario : Usuario = new Usuario(0,"","")

  ngOnInit(): void {
    this.nombre = this.home.getNombre2();
    this.contrasena = this.home.getCon2();
    this.usuario = new Usuario(this.id, this.nombre, this.contrasena);
    this.home.getUsuario(this.usuario).subscribe(res=>{
      this.crudService.getEventosUsuario(res.id).subscribe(cs => {
        this.eventos = cs;
        for (let index = 0; index < this.eventos.length; index++) {
          this.eventoService.getCategoria(this.eventos[index].Id_Categoria).subscribe(s =>{
            this.categoria[index] = s.Nombre;
          })
          this.eventoService.getTipo(this.eventos[index].Id_Tipo).subscribe(c =>{
            this.tipo[index] = c.Nombre;
          })        
        }
      });
    })
  }


  onBorrar(id:number){
    this.crudService.eliminarEvento(id);
  }
}
