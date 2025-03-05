import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consulta-enderecos',
  imports: [
    RouterLink,
    CommonModule,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './consulta-enderecos.component.html',
  styleUrl: './consulta-enderecos.component.css'
})
export class ConsultaEnderecosComponent {

  mensagem: string = '';
  idCliente: string = '';
  enderecos: any[] = []; // Lista de endereços
  idEndereco: string = ''; // Id do endereço

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Pegando o idCliente da URL
    this.idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente') as string;

    // Chamando a API para buscar os endereços do cliente
    this.httpClient.get<any[]>(environment.apiCliente +`/cliente/enderecos/consultar/${this.idCliente}`)
      .subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.enderecos = data; 
          } else {
            this.mensagem = "Nenhum endereço encontrado para este cliente.";
          }
        },
        error: () => {
          this.mensagem = "Erro ao buscar endereços. Tente novamente.";
        }
      });
  }

  excluirEndereco(id:string){
    if(confirm('Deseja realmente excluir o endereço selecionado?')){
      this.httpClient.delete<any>(environment.apiCliente +'/cliente/enderecos/excluir/' + id,
      ).subscribe({
        next:(data) => {
          //armazenando a mensagem
          this.mensagem = "Endereço excluído com sucesso!";
          //executar a consulta novamente
          this.ngOnInit();
        }
      });
    }
  }
}