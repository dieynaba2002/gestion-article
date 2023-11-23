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
    return this.http.get<any[]>(`${this.url}/posts`);
  }
  getUser(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.url}/users`);
  }
  getDetailsArticle(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.url}/posts`);
  }

  // // Méthode pour récupérer un article par son ID
  // getArticlesID(id:number): Observable<any>{
  //   const url = ${this.apiurl}/${id};
  //   return this.http.get(url);
  // }

  // export class ComposantArticleComponent implements OnInit {
  //   articles: any[];
  
  //   constructor(private articleService: ArticleService) {}
  
  //   ngOnInit() {
  //     this.articleService.getArticles().subscribe((data) => {
  //       this.articles = data.map((article, index) => ({ ...article, id: index + 1 }));
  //       localStorage.setItem('articles', JSON.stringify(this.articles));
  //     });
  //   }


  // @Injectable({
  //   providedIn: 'root',
  // })
  // export class ArticleService {
  //   private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
  //   constructor(private http: HttpClient) {}
  
  //   getArticles(): Observable<any[]> {
  //     return this.http.get<any[]>(this.apiUrl);
  //   }
  // }
  

  // Fonction pour afficher un sweetalert 
  verifInfos(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }
}
