import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Importa módulos necessários
})
export class ConsultaClientesComponent implements OnInit {
  clientes: any[] = []; // Lista de clientes
  filtroNome: string = ''; // Filtro de busca

  constructor(private httpClient: HttpClient) {}

  //função executada assim que a página é carregada
  ngOnInit() {
    this.carregarClientes(); // Chama o método para carregar os clientes ao iniciar
  }

  carregarClientes(): void {
    this.httpClient.get('http://localhost:9000/clientes/consultar')
      .subscribe({
        next: (data) => {
          this.clientes = data as any[]; // Atribui os dados recebidos à lista de clientes
          console.log(this.clientes); // Verifica os dados no console
        },
        error: (err) => {
          console.error('Erro ao carregar clientes:', err);
        }
      });
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
}
