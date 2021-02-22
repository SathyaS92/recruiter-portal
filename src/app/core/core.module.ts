import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { CommonModule } from '@angular/common';  
//import { AuthComponent } from './auth.component';
//import { NoAuthGuard } from './no-auth-guard.service';
//import { SharedModule } from '../shared';
import { AuthRoutingModule } from './login/auth.routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    //SharedModule,
    FormsModule,
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  // exports:[
  //   LoginComponent    
  // ]
//   providers: [
//     NoAuthGuard
//   ]
})
export class LoginModule {}