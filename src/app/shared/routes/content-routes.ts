import {Routes} from '@angular/router';
import {VerificadorService} from "../../Service/verificador.service";


export const
    content: Routes = [
      {
        path:'',
            redirectTo: 'navegacionboton/navboton',
              pathMatch: 'prefix'
      },

  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [VerificadorService],

  },
  {
    path: 'products',
    loadChildren: () => import('../../components/products/products.module').then(m => m.ProductsModule),
    data: {
      breadcrumb: "Productos"
    },
    canActivate: [VerificadorService],
  },

  {
    path: 'pages',
    loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule),
    data: {
      breadcrumb: "Pagos"
    },
    canActivate: [VerificadorService],
  },
  {
    path: 'auth',
    loadChildren: () => import('../../components/auth/auth.module').then(m => m.AuthModule),
    data:{
      breadcrumb: "Autentificación"
    },
    canActivate: [VerificadorService],
  },

  {
    path: 'users',
    loadChildren: () => import('../../components/users/users.module').then(m => m.UsersModule),
    canActivate: [VerificadorService],
    data: {
      breadcrumb: "Usuario"
    }
  },
  {
   path:'merma',
   loadChildren: () => import('../../components/merma/merma.module').then(m => m.MermaModule),
   canActivate: [VerificadorService],
   data: {
     breadcrumb: "Mermas"
    }
  },
  {
    path: 'navegacionboton',
    canActivate: [VerificadorService],
    loadChildren: () => import('../../components/botoncillo/botoncillo.module').then(m => m.BotoncilloModule)
  }


];
