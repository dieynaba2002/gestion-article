import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { CorbeilleComponent } from './corbeille/corbeille.component';
import { DetailsArticleComponent } from './details-article/details-article.component';

const routes: Routes = [
  { path: 'article/:id', component: ArticleComponent },
  { path:'', component:CorbeilleComponent},
  { path:'details-article', component:DetailsArticleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
