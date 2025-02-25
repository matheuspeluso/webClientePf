import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-enderecos',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-enderecos.component.html',
  styleUrl: './cadastro-enderecos.component.css'
})
export class CadastroEnderecosComponent {

  mensagem: string = '';
  alertClass: string = 'alert alert-primary alert-dismissible fade show';
  idCliente: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  formulario = new FormGroup({
    logradouro: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    complemento: new FormControl('', [Validators.minLength(4), Validators.maxLength(150)]),
    numero: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9\\-\\s]+$')]),
    bairro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    uf: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required, Validators.pattern('^\\d{5}-?\\d{3}$')]),
  });

  get f() {
    return this.formulario.controls;
  }

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  ngOnInit() {
    this.idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente') as string;
  }

  cadastrarEndereco() {
    this.httpClient.post<any>('http://localhost:9000/cliente/enderecos/cadastrar/' + this.idCliente, this.formulario.value)
      .subscribe({
        next: (data) => {
          this.mensagem = "Endereço cadastrado com sucesso!";
          this.alertClass = 'alert alert-success alert-dismissible fade show';
          this.formulario.reset();
        },
        error: (err) => {
          this.mensagem = "Erro ao cadastrar endereço!";
          this.alertClass = 'alert alert-danger alert-dismissible fade show';
        }
      })
  }
}
