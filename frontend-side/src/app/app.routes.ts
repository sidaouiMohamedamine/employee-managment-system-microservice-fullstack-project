import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';

export const routes: Routes = [
      {
    path:'auth',
    loadChildren: ()=> import('./modules/auth/auth.module').then( a => a.AuthModule),

  },
  {
    path:'admin-dashboard',
    loadChildren: ()=> import('./modules/admin/admin.module').then( ad => ad.AdminModule),

  },

    {path:'',redirectTo:'auth',pathMatch:'full'},

];
