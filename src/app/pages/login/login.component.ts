import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: Login = new Login();

  errorMessage: string | null = null;

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/']);
      }
    })}

  onLogin() {
    if (!this.loginObj.username || !this.loginObj.password) {
      this.errorMessage = 'Por favor ingrese un nombre de usuario y contraseña válidos.';
      return;
    }

    this.http.post(`${environment.urlBackend}/auth/login`, this.loginObj).subscribe({
      next: (res: any) => {
        const { token, usuarioBanco } = res;

        if (Array.isArray(usuarioBanco.fechaCreacion)) {
          const [year, month, day, hour, minute, second] = usuarioBanco.fechaCreacion;
          usuarioBanco.fechaCreacion = new Date(year, month - 1, day, hour, minute, second);
        }

        this.authService.setLoggedIn(true,usuarioBanco.id, usuarioBanco.username, token, usuarioBanco.fechaCreacion);

        this.router.navigate(["/"]);
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'No se pudo iniciar sesión. Verifique sus credenciales.';
      }
    });
  }
}

export class Login {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}