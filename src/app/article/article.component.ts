import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { from, mergeMap } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles: any;
  // tableau pour les utilisateurs
  users: any[] = [];
  tabTotal: any = []; 

  searchArticle: string = "";
  itemSearch: any;

  // Ajoutez ces propriétés en haut de votre composant
  pageActuelle: number = 1;
  articlesParPage: number = 12;


  // attributs
  imageUrl: string = "";
  title: string = "";
  body: string = "";

  idArticleUser = 0;
  tabUsers: any;
  userFound: any;
  articlesUserFound: any;
  
  tabArticle: any[] = [];
  

  // Article trouvé  
  articleUserFound: any;

  constructor(private article: ArticleService, private utilisateurService: UtilisateurService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.article.getArticles().subscribe((data) => {
      console.log(data);
      this.articles = data;
      this.filtrerArticle();
    });

    this.utilisateurService.getUsers().subscribe((data) => {
      this.users = data;
    });
    

    // On essaie de récupérer l'ID qui se trouve dans l'URL
    this.idArticleUser = this.route.snapshot.params['id'];
    console.log(this.idArticleUser);

    // ajout dans le local storage
    this.tabUsers = JSON.parse(localStorage.getItem("articleUsers") || '[]');
    

    this.userFound = this.tabUsers.find((element: any) => element.idUser == this.idArticleUser);
    this.articleUserFound = this.userFound.articles;
    console.log(this.articleUserFound);
    
  }

  filtrerArticle() {
    this.articles.forEach((element:any) => {
      if (element.userId === this.idArticleUser) {
        this.tabArticle.push(element);
        console.log(this.tabArticle, 'article');
      }
    });
  }
 


  // ajouterArticle() {
  //   console.log("ok");
  //   if (this.imageUrl == "" || this.title == "" || this.body == "") {
  //     this.article.verifInfos("Erreur!", "Veuillez remplir les champs", "error");
  //   } else {
  //     // On récupère le dernier element du tableau
  //     let articleUser = {
  //       idArticle: this.userFound.articles.length + 1,
  //       title: this.title,
  //       body: this.body,
  //       imageUrl: this.imageUrl,
  //       etatArticle: 1,
  //       createdAt: new Date(),
  //       createdBy: this.userFound.email
  //     }
  //     this.userFound.articles.push(articleUser);
  //     console.log(this.userFound);
  
  //     console.log(this.tabUsers);
  
  //     localStorage.setItem("articleUsers", JSON.stringify(this.tabUsers));
  //     this.article.verifInfos("Succes", "Article ajoute avec success", "success");

  //     let articlesTmp = JSON.parse(localStorage.getItem('articleUsers') || '[]');
  //     articlesTmp.push(articleUser);
  //     localStorage.setItem('articleUsers', JSON.stringify(articlesTmp));
  //     console.log('temp', {articlesTmp});
  //     this.filtrerArticle();
  //   }
          
  // }

  // Methode pour uploader le fichier image

  ajouterArticle() {
  if (this.imageUrl == "" || this.title == "" || this.body == "") {
    this.article.verifInfos("Erreur!", "Veuillez remplir les champs", "error");
  } else {
    // let tabTotal = JSON.parse(localStorage.getItem("articleUsers") || '[]');
    let articleUser = {
      idArticle: this.userFound.articles.length + 1,
      title: this.title,
      body: this.body,
      imageUrl: this.imageUrl,
      etatArticle: 1,
      createdAt: new Date(),
      createdBy: this.userFound.email
    };
    
    // tabTotal.push(articleUser);
    // localStorage.setItem("articleUsers", JSON.stringify(this.tabUsers));

    this.userFound.articles.push(articleUser);
    // mettre a jour le tableau 
    this.articles = [...this.articles, articleUser];

    console.log(this.userFound);

    // Mise à jour du localStorage
    localStorage.setItem("articleUsers", JSON.stringify(this.tabUsers));

    this.article.verifInfos("Succes", "Article ajouté avec succès", "success");

    this.filtrerArticle();
  }
  }

  // articleFound() {
  //   this.itemSearch = this.articles.filter(
  //     (item: any) => (item?.title.toLowerCase().includes(this.searchArticle.toLowerCase())));
  // }

  articleFound() {
  if (this.searchArticle.trim() === '') {
    // Si le champ de recherche est vide, réinitialiser la liste des articles
    this.itemSearch = [];
  } else {
    // Filtrer les articles en fonction de la recherche
    this.itemSearch = this.articles.filter(
      (item: any) => item.title.toLowerCase().includes(this.searchArticle.toLowerCase())
    );
  }
}



  // methode qui permet de supprimer
  //  supprimerArticle(paramArticle:any){
  //   Swal.fire({
  //     title: "Etes-vous sur???",
  //     text: "Vous allez supprimer le Article",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#0097b2",
  //     cancelButtonColor: "#FF9A9A",
  //     confirmButtonText: "Oui, je supprime!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       paramArticle.etatArticle = 0;
  //       // On met à jour le tableau qui est stocké dans le localStorage 
  //       localStorage.setItem("articleUsers", JSON.stringify(this.tabUsers));
  //       this.article.verifInfos("Article supprimer!", "", "success");     
        
  //     }
  //   }); 
  // }

  // Methode pour uploader l'image
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

   // methode qui permet de supprimer
   deleteArticle(idArticle: any) {
    from(
      Swal.fire({
        title: "Etes-vous sûr???",
        text: "Vous allez supprimer le Article",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0097b2",
        cancelButtonColor: "#FF9A9A",
        confirmButtonText: "Oui, je supprime!"
      })
    ).pipe(
      mergeMap((result) => {
        if (result.value) {
          // Si l'utilisateur clique sur "Oui, je supprime!"
          return this.article.deleteArticle(idArticle);
        } else {
          // Si l'utilisateur clique sur "Annuler" ou ferme la boîte de dialogue
          return Promise.resolve(null);
        }
      })
    ).subscribe(() => {
      // Supprimer l'article de la liste des articles
      this.articles = this.articles.filter((article: any) => article.id !== idArticle);
    });
  }

   // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    if (!this.articles) {
      return [];
    }

    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.articles.slice(indexDebut, indexFin);
  }
   // Méthode pour générer la liste des pages
  get pages(): number[] {
    if (!this.articles || this.articles.length === 0 || this.articlesParPage <= 0) {
      return [];
    }

    const totalPages = Math.ceil(this.articles.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    if (!this.articles || this.articles.length === 0 || this.articlesParPage <= 0) {
      return 0;
    }
    return Math.ceil(this.articles.length / this.articlesParPage);
  }

}