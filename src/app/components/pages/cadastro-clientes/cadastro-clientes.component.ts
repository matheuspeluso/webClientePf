import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css'],
  imports: [
    FormsModule, 
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()
  ],
})

export class CadastroClientesComponent {

  mensagem: string = ''; //variavel para armazenar mensagem da api
  alertClass: string = 'alert alert-primary alert-dismissible fade show'; // classe boostrap para estilizar a mensagem condicionalmente

  constructor( //injeção de dependência para poder usar o HttpClient
    private httpClient: HttpClient,
  ) { }


  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.pattern('^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{11})$')]),
    dataNascimento: new FormControl('', [Validators.required]),
    endereco: new FormGroup({
      logradouro: new FormControl('', [Validators.required , Validators.minLength(8), Validators.maxLength(100)]),
      complemento: new FormControl('', [Validators.required , Validators.minLength(4), Validators.maxLength(150)]),
      numero: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9\\-\\s]+$')]),
      bairro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      uf: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required,Validators.pattern('^\\d{5}-?\\d{3}$')]),
    }),
  });

  get f(){ // função para que possamos exibir na pagina as mensagems de validação para cada campo do formulário
    return this.formulario.controls;
  }

  get e(){ // função para que possamos exibir na pagina as mensagems de validação do endereço
    return (this.formulario.get('endereco') as FormGroup).controls;
  }

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  cadastrarCliente() {
    this.httpClient.post<any>(environment.apiCliente + '/clientes/cadastrar', this.formulario.value)
      .subscribe({
        next: (data) => {
          this.mensagem = data.mensagem; // Captura a mensagem da resposta
          this.alertClass = 'alert alert-primary alert-dismissible fade show';
          this.formulario.reset(); // Limpa os campos do formulário
        },
        error: (err) => {
          console.error('Erro ao cadastrar cliente:', err);
         this.mensagem = 'Erro ao cadastrar cliente';
         this.alertClass = 'alert alert-danger alert-dismissible fade show';
        }
      });
  }
}