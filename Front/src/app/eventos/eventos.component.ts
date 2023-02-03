import { Component, OnInit } from '@angular/core';
import { Evento } from './evento';
import { EventosService } from './eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  constructor(private eventoService: EventosService) { }

  eventos: Array<Evento> = [new Evento("Evento 1","Paipa","Calle 27","2022","2022",1,1,1)];
  categoria: string[] = [''];
  tipo: string[] = [''];

  ngOnInit(): void {
    this.getLista();
  }
  
  getLista(){
    this.eventoService.getEventos('').subscribe(cs => {
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
  }

}
