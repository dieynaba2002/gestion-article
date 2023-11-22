import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles: any[] = [];
  // tableau pour les utilisateurs
  users: any[] = [];

  // attributs
  imageUrl: string = "";
  titre: string = "";
  description: string = "";

  idArticleUser = 0;
  tabUsers: any;
  userFound: any;
  articlesUserFound: any;
  

  // Article trouvé  
  articleUserFound: any;

  constructor(private article: ArticleService, private utilisateurService: UtilisateurService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.article.getArticles().subscribe((data) => {
      console.log(data);
      this.articles = data;
    });

    this.utilisateurService.getUsers().subscribe((data) => {
      this.users = data;
    });

    // On essaie de récupérer l'ID qui se trouve dans l'URL
    this.idArticleUser = +this.route.snapshot.params['id'];
    console.log(this.idArticleUser);

    // ajout dans le local storage
    this.tabUsers = JSON.parse(localStorage.getItem("articleUsers") || '[]');

    this.userFound = this.tabUsers.find((element: any) => element.idUser == this.idArticleUser);
    this.articleUserFound = this.userFound.articles;
    console.log(this.articleUserFound);

  }

  ajouterArticle() {
    if (this.imageUrl == "" || this.titre == "" || this.description == "") {
      this.article.verifInfos("Erreur!", "Veuillez remplir les champs", "error");
    } else {
      // On récupère le dernier element du tableau  
      let articleUser = {
        idArticle: this.userFound.articles.length + 1,
        titreArticle: this.titre,
        descriptionArticle: this.description,
        etatArticle: 1,
        createdAt: new Date(),
        createdBy: this.userFound.email
      }
      this.userFound.articles.push(articleUser);
      console.log(this.userFound);
  
      console.log(this.tabUsers);
  
      localStorage.setItem("articleUsers", JSON.stringify(this.tabUsers));
    }
          
  }

  // Methode pour uploader le fichier image 
  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const selectedFile = fileList[0];
      if (selectedFile) {
        // Vérification du type de fichier (image)
        if (selectedFile.type.match('image.*')) {
          // Crée un objet URL pour afficher un aperçu de l'image
          this.imageUrl = URL.createObjectURL(selectedFile);
        }
      }
    }
  }

}
