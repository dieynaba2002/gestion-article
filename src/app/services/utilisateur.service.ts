import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

   
  getUsers(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.url}/users?_limit=2`);
  }

}
