import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css'],
  imports: [
    FormsModule, 
    CommonModule,
    ReactiveFormsModule
  ],
})

export class CadastroClientesComponent {

  constructor( //injeção de dependência para poder usar o HttpClient
    private httpClient: HttpClient,
  ) { }


  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    endereco: new FormGroup({
      logradouro: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      numero: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
    }),
  });

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  cadastrarCliente() {
    this.httpClient.post('http://localhost:9000/clientes/cadastrar', 
      this.formulario.value,
      {responseType: 'text'}
    )
    .subscribe({
      next: (data) => {
        console.log(data);
        alert('Cliente cadastrado com sucesso!');
      }
    })
  }
}