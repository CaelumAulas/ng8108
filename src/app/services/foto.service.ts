import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Foto } from "../foto/foto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FotoService {

    url = 'http://localhost:3000/v1/fotos/';

    constructor(private conexaoApi: HttpClient){}

    listar(): Observable<Foto[]> {
        return this.conexaoApi.get<Foto[]>(this.url)
    }

    cadastrar(foto: Foto): Observable<Object> {
        return this.conexaoApi.post(this.url,foto)
    }

    buscar(fotoId: string): Observable<Foto> {
        return this.conexaoApi.get<Foto>(this.url+fotoId)
    }
    
    deletar(foto: Foto): Observable<Object> {
        return this.conexaoApi.delete(this.url+foto._id)
    }

    alterar(foto: Foto): Observable<Object> {
        return this.conexaoApi.put(this.url+foto._id,foto)
    }

}