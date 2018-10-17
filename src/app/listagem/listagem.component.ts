import { Component, OnInit } from '@angular/core';
import { Foto } from '../foto/foto';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'caelumpic-listagem',
  templateUrl: './listagem.component.html',
  styles: []
})
export class ListagemComponent implements OnInit {

  title = 'CaelumPic';
  listaFotos: Foto[] = [];

  constructor(private servico: FotoService){}
  
  ngOnInit(){
    
    this.servico.listar()
              .subscribe((retornoApi) => {
                this.listaFotos = retornoApi;
              });
  }
 
  apagar(fotoApagada: Foto){
      
      this.servico
        .deletar(fotoApagada)
        .subscribe(
          () => {
            console.log(`${fotoApagada.titulo} removida com sucesso`);
            this.listaFotos = this.listaFotos.filter(fotoDaLista => fotoDaLista !== fotoApagada)
          }
        );
  }
}
