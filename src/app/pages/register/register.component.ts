import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerObj: Register;

  constructor(private http: HttpClient) {
    this.registerObj = new Register();
  }

  onRegister() {
    const registerData = {
      username: this.registerObj.username,
      password: this.registerObj.password,
      email: this.registerObj.email
    };

    this.http.post(`${environment.urlBackend}/auth/register`, registerData)
      .subscribe({
        next: (res) => {
          console.log('Registro exitoso', res);
        },
        error: (err) => {
          console.error('Error en el registro', err);
        }
      });
  }
}

export class Register {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
  }
}
