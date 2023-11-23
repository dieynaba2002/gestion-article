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

   getArticles() {
    //  return this.http.get<any[]>(`${this.url}/posts?_limit=10`);
     return this.http.get("https://jsonplaceholder.typicode.com/posts");
   }
  getUser(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.url}/users?`);
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
