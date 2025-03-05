import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    FormsModule,
    NgxPaginationModule,
    NgxMaskPipe
  ], // Importa módulos necessários
  providers: [
    provideNgxMask()
  ],
})
export class ConsultaClientesComponent{

  clientes: any[] = []; // Lista de clientes
  filtroNome: string = ''; // Filtro de busca
  mensagem: string = ''; // Mensagem de retorno da api
  paginador : number = 1; // Paginador para a lista de clientes

  constructor(private httpClient: HttpClient) {}

  //função executada assim que a página é carregada
  ngOnInit() {
    this.carregarClientes(); // Chama o método para carregar os clientes ao iniciar
  }

  carregarClientes(): void {
    this.httpClient.get<any>(environment.apiCliente +'/clientes/consultar')
      .subscribe({
        next: (data) => {
          this.clientes = data as any[]; // Atribui os dados recebidos à lista de clientes
          console.log(this.clientes); // Verifica os dados no console
        },
        error: (err) => {
          this.mensagem = 'Erro ao carregar clientes:', err;
        }
      });

      this.filtroNome = "";
  }

  filtrarClientes(): void {
    if (this.filtroNome.trim() === '') {
      this.carregarClientes(); // Se não houver filtro, recarrega os clientes
    } else {
      this.clientes = this.clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    }
  }

  excluirCliente(id:string){
    if(confirm('Deseja realmente excluir o cliente selecionado?')){
      this.httpClient.delete<any>(environment.apiCliente +'/clientes/excluir/' + id,
      ).subscribe({
        next:(data) => {
          //armazenando a mensagem
          this.mensagem = data.mensagem;
          //executar a consulta novamente
          this.ngOnInit();
        }
      });
    }
  }

  //função para fazer o recurso de avançar e voltar do paginador

  handlePageChange(event: any){
    this.paginador = event;
  }
  
}
