import { Component, OnInit } from '@angular/core';
import { Evento } from './evento';
import { EventosService } from './evenots.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  constructor(private eventoService: EventosService) { }

  eventos: Array<Evento> = [new Evento("Evento 1","Paipa","Calle 27","2022","2022",1,1,1)];

  ngOnInit(): void {
    this.getLista();
  }
  
  getLista(){
    this.eventoService.getEventos('').subscribe(cs => {
      this.eventos = cs;
      console.log(this.eventos[0])
    });
  }

}
