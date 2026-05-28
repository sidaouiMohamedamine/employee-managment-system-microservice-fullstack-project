import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { NavbarComponent} from '../../layout/navbar/navbar.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarComponent,
    NavbarComponent,
    
    
  ]
})
export class AdminModule { }
