import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadastro } from '../models/cadastro.model';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl = 'https://api.exemplo.com/cadastro'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) {}

  registrarUsuario(dados: Cadastro): Observable<any> {
    return this.http.post<any>(this.apiUrl, dados);
  }
}
