import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Evento } from './evento'

@Injectable({
    providedIn: 'root'
})

export class EventosService {

    constructor (private http: HttpClient) {}

    public getEventos(nombre:String):Observable<Evento[]>
    {
        return this.http.get<Evento[]>('http://127.0.0.1:5000/lista')
    }

}