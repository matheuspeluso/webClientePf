import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './components/pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './components/pages/consulta-clientes/consulta-clientes.component';
import { EdicaoClintesComponent } from './components/pages/edicao-clintes/edicao-clintes.component';

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
        path: "pages/clientes/edicao",
        component: EdicaoClintesComponent
    },

    //Incluindo uma configuração para definir a página inicial do projeto
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/clientes/consulta'
    }
];
