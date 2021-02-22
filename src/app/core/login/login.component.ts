import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare const showLoader:any;
declare const hideLoader:any;
import { Compiler} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email:string="";
  //public password:string="";
  public showValidation:boolean=false;
  private apiURL:string="";
  public loginForm = this.formBuilder.group({
    userName: '',
    password: ''
  });
 

  constructor(private router:Router,private formBuilder: FormBuilder, private authService:AuthService, private _compiler:Compiler) { 
    this.apiURL = environment.apiUrl;
    
  }

  ngOnInit(): void {
  }

  OnLogin(){
    showLoader();
    let password = "";
    this.authService.Login(this.loginForm.value.userName,this.loginForm.value.password).subscribe((result:any) =>{      
      hideLoader();            
        if(result != null){          
          localStorage.setItem("UserName", result);          
          this.router.navigateByUrl('/toBeReviewedJobs');          
        }else{          
          this.showValidation = true;
        }
    })
  }
}
