import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  userInitials: string = '';
  id: number = 0;
  username: string = '';
  JWT: string = '';
  fechaCreacion: Date | null = null;

  constructor() {
    this.loadAuthData();
  }

  get isLoggedIn(): BehaviorSubject<boolean> {
    return this._isLoggedIn;
  }

  setLoggedIn(status: boolean, id: number, username: string, token: string, fechaCreacion: Date): void {
    this._isLoggedIn.next(status);
    this.id = id;
    this.username = username;
    this.JWT = token;
    this.fechaCreacion = fechaCreacion;
    this.userInitials = this.calculateInitials(username);

    // Guardar en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('id', id.toString());
    localStorage.setItem('fechaCreacion', fechaCreacion.toISOString());
  }

  private calculateInitials(username: string): string {
    if (!username) return ''; 
    const names = username.split(' ');
    return names.map(name => name.charAt(0).toUpperCase()).join('');
  }

  loadAuthData(): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const idStr = localStorage.getItem('id');
    const fechaCreacionStr = localStorage.getItem('fechaCreacion');

    if (token && username && idStr && fechaCreacionStr) {
      this.JWT = token;
      this.username = username;
      this.id = parseInt(idStr, 10);
      const parsedDate = new Date(fechaCreacionStr);
      // Validar que la fecha sea válida
      this.fechaCreacion = isNaN(parsedDate.getTime()) ? null : parsedDate;
      this.userInitials = this.calculateInitials(username);
      this._isLoggedIn.next(true);
    } else {
      this._isLoggedIn.next(false);
    }
  }

  logout(): void {
    this._isLoggedIn.next(false);
    this.username = '';
    this.JWT = '';
    this.userInitials = '';
    this.id = 0;
    this.fechaCreacion = null;

    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('fechaCreacion');
  }
}