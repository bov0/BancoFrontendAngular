import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TableTransaccionesComponent } from '../../components/transacciones-table/transacciones-table.component';
import { CommonModule } from '@angular/common';
import { CuentaCardDetailsComponent } from '../../components/cuenta-card-details/cuenta-card-details.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { TarjetaCardDetailsComponent } from '../../components/tarjeta-card-details/tarjeta-card-details.component';
import { forkJoin } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [TableTransaccionesComponent,CuentaCardDetailsComponent,SkeletonComponent,TarjetaCardDetailsComponent,ButtonComponent,CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  cuentasBancarias: any[] = [];
  tarjetasCredito: any[] = [];
  transacciones: { [key: string]: any[] } = {};
  errorMessage: string | null = null;
  cuentaSeleccionada: any = null;

  constructor(
    public authService: AuthService,
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn.value) {
      this.router.navigate(['/']);
    } else {
      const token = this.authService.JWT;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.http.get(`${environment.urlBackend}/api/cuentasBancarias/usuario/${this.authService.id}`, { headers })
        .subscribe({
          next: (res: any) => {
            this.cuentasBancarias = res;
            console.log('Cuentas bancarias:', this.cuentasBancarias);
  
            const tarjetasRequests = this.cuentasBancarias.map(cuenta => 
              this.http.get(`${environment.urlBackend}/api/tarjetasCredito/cuenta/${cuenta.id}`, { headers })
            );
  
            forkJoin(tarjetasRequests).subscribe({
              next: (tarjetasRes: any) => {
                this.tarjetasCredito = [].concat(...tarjetasRes);
                console.log('Tarjetas de crédito cargadas:', this.tarjetasCredito);
              },
              error: (err:any) => {
                console.error('Error al cargar tarjetas de crédito:', err);
                this.errorMessage = 'No se pudieron cargar las tarjetas de crédito.';
              }
            });
          },
          error: (err) => {
            console.error('Error al cargar cuentas bancarias:', err);
            this.errorMessage = 'No se pudieron cargar las cuentas bancarias.';
          }
        });
    }
  }
  
  cargarTarjetasCredito(cuentaId: number, headers: HttpHeaders) {
    this.http.get(`${environment.urlBackend}/api/tarjetasCredito/cuenta/${cuentaId}`, { headers })
      .subscribe({
        next: (res: any) => {
          this.tarjetasCredito[cuentaId] = res;
          console.log(`Tarjetas de crédito para la cuenta ${cuentaId}:`, res);
        },
        error: (err) => {
          console.error(`Error al cargar tarjetas de crédito para la cuenta ${cuentaId}:`, err);
          this.errorMessage = 'No se pudieron cargar las tarjetas de crédito.';
        }
      });
  }  

  onCuentaSeleccionada(cuenta: any) {
    this.cuentaSeleccionada = cuenta;
    
    if (!this.transacciones[cuenta.id]) {
      const token = this.authService.JWT;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get(`${environment.urlBackend}/api/transacciones/cuenta/${cuenta.id}`, { headers })
        .subscribe({
          next: (res: any) => {
            this.transacciones[cuenta.id] = res;
            console.log('Transacciones para cuenta', cuenta.numeroCuenta, res);
          },
          error: (err) => {
            console.error('Error al cargar transacciones:', err);
            this.errorMessage = 'No se pudieron cargar las transacciones.';
          }
        });
    }
  }

  onTarjetaSeleccionada(tarjeta: any) {
    this.cuentaSeleccionada = tarjeta;
    
    if (!this.transacciones[tarjeta.id]) {
      const token = this.authService.JWT;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get(`${environment.urlBackend}/api/transacciones/tarjeta/${tarjeta.id}`, { headers })
        .subscribe({
          next: (res: any) => {
            this.transacciones[tarjeta.id] = res;
            console.log('Transacciones para cuenta', tarjeta.numeroCuenta, res);
          },
          error: (err) => {
            console.error('Error al cargar transacciones:', err);
            this.errorMessage = 'No se pudieron cargar las transacciones.';
          }
        });
    }
  }
}
