import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Evento } from './evento'
import { Categoria } from './categoria'
import { Tipo } from './tipo'

@Injectable({
    providedIn: 'root'
})

export class EventosService {

    constructor (private http: HttpClient) {}

    public getEventos(nombre:String):Observable<Evento[]>
    {
        return this.http.get<Evento[]>('http://127.0.0.1:5000/lista')
    }

    public getTipo(id:number):Observable<Tipo>
    {
        return this.http.get<Tipo>('http://127.0.0.1:5000/tipo/' + id)
    }

    public getCategoria(id:number):Observable<Categoria>
    {
        return this.http.get<Categoria>('http://127.0.0.1:5000/categoria/' + id)
    }

}