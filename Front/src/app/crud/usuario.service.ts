import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Tipo } from '../eventos/tipo'
import { Evento } from '../eventos/evento'

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    constructor (private http: HttpClient) {}

    

}