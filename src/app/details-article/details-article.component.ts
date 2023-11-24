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
  articleFound:any

  constructor(public article: ArticleService, private route: ActivatedRoute) { }


  ngOnInit(): void{
    this.getAllArticles()
    this.idArticle = localStorage.getItem("id")
    console.log(this.idArticle);
  
  }
  getAllArticles(){
    this.article.getDetailsArticle().subscribe((data) => {
      this.articles = data;
      this.articleFound = this.articles.find((article)=> article.id === +this.idArticle)
      console.log(this.articleFound);

    });
  
  }
  
}
