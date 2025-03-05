import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './components/pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './components/pages/consulta-clientes/consulta-clientes.component';
import { EdicaoClintesComponent } from './components/pages/edicao-clintes/edicao-clintes.component';
import { ConsultaEnderecosComponent } from './components/pages/consulta-enderecos/consulta-enderecos.component';
import { CadastroEnderecosComponent } from './components/pages/cadastro-enderecos/cadastro-enderecos.component';
import { EdicaoEnderecoComponent } from './components/pages/edicao-endereco/edicao-endereco.component';

export const routes: Routes = [
    {
        path: "pages/clientes/cadastro",
        component: CadastroClientesComponent
    },
    {
        path: "pages/clientes/consulta",
        component: ConsultaClientesComponent
    },
    {
        // Modificado para aceitar um parâmetro 'id' na URL
        path: "pages/clientes/edicao/:id",
        component: EdicaoClintesComponent
    },
    {
        path: "pages/clientes/enderecos/:idCliente",
        component: ConsultaEnderecosComponent
    },
    {
        path: "pages/clientes/enderecos/cadastro/:idCliente",
        component: CadastroEnderecosComponent
    },
    {
        path: "pages/clientes/enderecos/edicao/:idCliente/:idEndereco",
        component: EdicaoEnderecoComponent
    },

    // Incluindo uma configuração para definir a página inicial do projeto
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/clientes/consulta'
    }
];
