import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent {

  articles: any[] = [];
  // tableau pour les utilisateurs
  users: any[] = [];

  // attributs
  
  imageUrl: string = "";
  title: string = "";
  description: string = "";

  idArticleUser = 0;
  tabUsers: any;
  userFound: any;
  articlesUserFound: any;
  idArticle: any;
  articleFound: any
  
  recupComment: any;
  articleDetailsComments: any[] = [];

  constructor(public article: ArticleService, private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit(): void{
    this.getAllArticles()
    this.idArticle = localStorage.getItem("id")
    console.log(this.idArticle);

     // Appel pour récupérer les commentaires de l'article spécifique
      this.article.getCommentsByArticleID(this.idArticle).subscribe((comments: any[]) => {
        console.log('Commentaires récupérés :', comments);
        this.articleDetailsComments = comments; 
      })
    this.articleFound = {};
  
  }

  
  getAllArticles(){
    this.article.getDetailsArticle().subscribe((data) => {
      this.articles = data;
      this.articleFound = this.articles.find((article)=> article.id === +this.idArticle)
      console.log(this.articleFound);

    });
  
  }
  
  
}
