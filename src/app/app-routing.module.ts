import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { CorbeilleComponent } from './corbeille/corbeille.component';

const routes: Routes = [
  { path: 'article/:id', component: ArticleComponent },
  { path:'login', component:CorbeilleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
