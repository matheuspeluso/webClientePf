import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edicao-endereco',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
 providers: [provideNgxMask()],
  templateUrl: './edicao-endereco.component.html',
  styleUrl: './edicao-endereco.component.css'
})
export class EdicaoEnderecoComponent {

  mensagem : string = '';
  alertClass: string = 'alert alert-primary alert-dismissible fade show';
  idCliente: string = '';
  idEndereco: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, //injeção de dependência para poder pegar o id da URL
    private router: Router
  ){ }

  
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
    this.carregarEndereco();
  }
  
  carregarEndereco(): void {
    this.idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente') as string;

    this.idEndereco = this.activatedRoute.snapshot.paramMap.get('idEndereco') as string;

    this.httpClient.get<any>(environment.apiCliente +`/cliente/enderecos/consultar/endereco/${this.idEndereco}`)
      .subscribe({
        next: (data) => {
          console.log("Dados recebidos da API:", data);  // Adicione esse log para inspecionar os dados
          this.formulario.patchValue(data);
        },
        error: (err) => {
          this.mensagem = "Erro ao carregar dados do endereço!";
          this.alertClass = 'alert alert-danger alert-dismissible fade show';
        }
      });
  }

  editarEndereco(): void {
    this.httpClient.put<any>(environment.apiCliente +`/cliente/enderecos/alterar/${this.idEndereco}`, this.formulario.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.mensagem = "Endereço editado com sucesso!";
          this.alertClass = 'alert alert-success alert-dismissible fade show';
          this.router.navigate(['/clientes', this.idCliente, 'enderecos']); // Redireciona para a lista de endereços
        },
        error: (err) => {
          console.log("Mensagem de erro: ", err);
          this.mensagem = "Erro ao editar endereço!";
          this.alertClass = 'alert alert-danger alert-dismissible fade show';
        }
      });
  }

}
