import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles: any[] = [];

  constructor(private article: ArticleService) {}

  ngOnInit(): void {

    this.article.getArticles().subscribe((data) => {
       console.log(data);
      this.articles = data;
    });
  }

}
