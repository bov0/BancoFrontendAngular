import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Route, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  cuentasBancarias: any[] = [];
  errorMessage: string | null = null;

  constructor(
    public authService: AuthService,
    public router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn.value) {
      this.router.navigate(['/']);
    } else {
      // Obtén el token JWT
      const token = this.authService.JWT;

      // Establecer encabezados para la solicitud
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      // Hacer la solicitud GET
      this.http.get(`${environment.urlBackend}/api/cuentasBancarias/usuario/${this.authService.id}`, { headers })
        .subscribe({
          next: (res: any) => {
            this.cuentasBancarias = res;
            console.log(res)
          },
          error: (err) => {
            console.error('Error:', err);
            this.errorMessage = 'No se pudieron cargar las cuentas bancarias.';
          }
        });
    }
  }
}
