import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-edicao-clintes',
  imports: [
    FormsModule, 
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()
  ],
  templateUrl: './edicao-clintes.component.html',
  styleUrl: './edicao-clintes.component.css'
})
export class EdicaoClintesComponent {

  mensagem: string = '';
  id: string = '';
  alertClass: string = 'alert alert-primary alert-dismissible fade show';

  constructor( //injeção de dependência para poder usar o HttpClient
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute //injeção de dependência para poder pegar o id da URL
  ) { }

  ngOnInit(){ //realizando a requisição de consulta por id ao iniciar o componente
    //capturando o id do cliente enviado na URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultando o cliente na API através do ID
    this.httpClient.get<any>(environment.apiCliente +'/clientes/consultar/' + this.id)
      .subscribe({
        next: (data) => {

          if (data.dataNascimento) {
            // Extraindo apenas a parte da data (yyyy-MM-dd)
            data.dataNascimento = data.dataNascimento.split(' ')[0];
          }
          //preencher o formulário com os dados do cliente
          this.formulario.patchValue(data);
        },
      });
  }

  
  get f(){ 
    return this.formulario.controls;
  }
  
  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.pattern('^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{11})$')]),
    dataNascimento: new FormControl('', [Validators.required]),
  });

  editarCliente() {
    
    //enviando uma requisição PUT para a API (atualizar o cliente)
    this.httpClient.put<any>(environment.apiCliente +'/clientes/alterar/'+ this.id,
      this.formulario.value, //enviando os dados do formulário
    ).subscribe({
      next: (data) => {
        //exibindo a mensagem obtida da API
        this.mensagem = data.mensagem;
        this.alertClass = 'alert alert-primary alert-dismissible fade show';
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
        this.mensagem = 'Erro ao atualizar cliente. Tente novamente.';
        this.alertClass = 'alert alert-danger alert-dismissible fade show'; //alerta de erro
      }
    })

  }
}