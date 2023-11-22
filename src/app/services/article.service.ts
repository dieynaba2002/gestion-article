import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

   getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/posts?_limit=2`);
   }
  getUser(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.url}/users?_limit=2`);
  }

  // Fonction pour afficher un sweetalert 
  verifInfos(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }
}
