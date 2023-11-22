import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

   getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/posts?_limit=2`);
  }
}
