import { Component, OnInit } from '@angular/core';
import { Foto } from '../foto/foto';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoService } from '../services/foto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'caelumpic-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new Foto()
  formCadastro: FormGroup

  constructor(private servico: FotoService,
              private rotaAtiva: ActivatedRoute,
              private roteador: Router,
              private formBuilder: FormBuilder){}

  ngOnInit() {

    this.formCadastro = this.formBuilder.group({
      titulo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      url: ['', Validators.required],
      descricao: ''
    })

    this.rotaAtiva.params.subscribe( parametros => {

      let id = parametros.fotoId;
      
      //se tiver id, quer dizer que é aleração e preciso carregar os dados.
      if(id){
        this.servico
            .buscar(id)
            .subscribe(
              (fotoApi) => {
                this.foto = fotoApi
                this.formCadastro.patchValue(fotoApi)
              }
            )
      }
    })    
  }

  salvar(){
    
    this.foto = { ...this.foto, ...this.formCadastro.value}
  
    if(this.foto._id){
      this.servico
          .alterar(this.foto)
          .subscribe(
            () => {
              console.log('Foto alterada com sucesso')
              this.roteador.navigate([''])
            }
          )
    }
    else { 
      this.servico
          .cadastrar(this.foto)
          .subscribe(
            (resposta) => { 
              console.log(resposta)
              
            },
            (erro) => {
              console.log(erro)
            }
          )
    }
  }
}
