import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Article } from '../model/Article';
import { User } from '../model/User';

@Component({
  selector: 'app-corbeille',
  templateUrl: './corbeille.component.html',
  styleUrls: ['./corbeille.component.css']
})
export class CorbeilleComponent implements OnInit {

  articleUsers: User[] = [];

  // attributs
  nom: string = "";
  prenom: string = "";
  email: string = "";
  password: string = "";

  // tableaux
  tabUsers: any;
  currentUser: any;

  formChoice = true;
  
  // Le constructeur 
  constructor(private route: Router) { }


  // Methode d'initialisation 
  ngOnInit() {
    if (!localStorage.getItem("articleUsers")) {
      localStorage.setItem("articleUsers", JSON.stringify(this.articleUsers));
    }

    this.tabUsers = JSON.parse(localStorage.getItem("articleUsers") || '[]');
  }

  // fonction qui permet de vider les champs
  viderChamps() {
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password = "";
  }

  // fonction qui gere la connexion
  login() {
     //  On verifie si les champs contiennent de l'information 
    if (this.email == "" || this.password == "") {
      this.verifInfos("Erreur!", "Veuillez remplir les champs", "error");
    }else if (this.tabUsers.length == 0) {
      this.verifInfos("Erreur!", "Ce compte n'existe pas", "error");
    }else {
      this.currentUser = this.tabUsers.find((element: any) => (element.email == this.email && element.password == this.password))
      if (this.currentUser) {
        this.verifInfos("Cool!", "Bienvenu dans votre espace de travail ", "success");
        this.route.navigate(['/article', this.currentUser.idUser]);
      }else {
        this.verifInfos("Erreur!", "Ce compte n'existe pas", "error");
      }
    }
  }

  // fonction qui gere l'inscription
  inscription() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (this.nom == "" || this.prenom == "" || this.email == "" || this.password == "") {
      this.verifInfos("Erreur!", "Veuillez remplir les champs", "error");
    }else if (!this.email.match(emailPattern)) {
      this.verifInfos("Erreur!", "Email invalide", "error");
    }else if (this.password.length < 8) {
      this.verifInfos("Erreur!", "Mot de passe doit être supérieur ou égal à 8", "error");
    }else {
      // Si toutes les vérifications sont valdes on crée le compte de l'utilisateur
      let utilisateur = {
        idUser: this.tabUsers.length + 1,
        etat: 1,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
        articles: [],
      }
      let userExist = this.tabUsers.find((element: any) => element.email == this.email);
      console.log(userExist);
      if (userExist) {
        this.verifInfos('Impossible!', 'Ce compte existe déjà', 'error');
      }else {
        this.tabUsers.push(utilisateur);
        console.log(this.tabUsers);

        localStorage.setItem("articleUsers", JSON.stringify(this.tabUsers));

        this.verifInfos("Merci", "Compte créé avec succes", "success");
        this.viderChamps();

        this.ShowForm();

      }

    }

  }

  // Methode pour choisir le formulaire
  ShowForm() {
    this.email = "";
    this.password = "";
    this.formChoice = !this.formChoice;
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
