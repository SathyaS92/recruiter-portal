import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL:string="";

  private http:HttpClient
  constructor(private _http: HttpClient) { 
    this.http = _http;
    this.apiURL = environment.apiUrl;
  }

      Login(userName:string, password:string){      
      return this.http.get(this.apiURL + "User/GetUserDetails?userName="+userName+"&password="+password,{responseType: 'text'} );
    }

    SignOut(userName:string){      
      return this.http.post(this.apiURL + "User/SignOutUser?userName="+userName, {responseType: 'text'});
    }
}
