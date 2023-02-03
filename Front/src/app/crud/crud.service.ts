import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Tipo } from '../eventos/tipo'
import { Evento } from '../eventos/evento'

@Injectable({
    providedIn: 'root'
})

export class CrudService {

    constructor (private http: HttpClient) {}

    public getEventosUsuario(id:number):Observable<Evento[]>{
        return this.http.get<Evento[]>('http://127.0.0.1:5000/usuario/'+ id +'/eventos')
    }

    public crearEvento(evento:Evento):Observable<Evento>{
        return this.http.post<Evento>('http://127.0.0.1:5000/crear',evento)
    }

    public eliminarEvento(id:number){
        console.log(typeof id);
        return this.http.delete(`http://localhost:5000/eliminar/${id}`).subscribe((data)=>{console.log("elimiando")});
    }

    public actualizar(id:number, evento:Evento){
        this.http.post('http://localhost:5000/actualizar/'+id, evento)
    }

}