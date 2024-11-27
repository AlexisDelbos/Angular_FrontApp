import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { User } from 'src/app/model/user.model';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newUser: User = new User('', ''); 
  users: User[] = [];
  error: string | undefined;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticateService,
    private _toastService : ToastService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.error = 'Vous n\'êtes pas autorisé à accéder à cette page.';
      return;
    }

    this.getAllUsers();
  }
  /*
    Récupère les utilisateurs dans la base de données
  */
  getAllUsers() {
    this.apiService.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }


  /*
    Créer  un utilisateur dans la base de données
  */
    createUser() {
      
      let hashedPassword = this.authService.hashPassword(this.newUser.password);  
      const userToSend = {
        email: this.newUser.email,
        password: hashedPassword,  
        roles: this.newUser.roles
      };
    
      this.apiService.addUser(userToSend).subscribe({
        next: (response) => {
          console.log("Utilisateur créé avec succès");
          this.newUser = new User('', ''); 
          this.getAllUsers(); 
        },
        error: (err) => {
          this.error = "Erreur lors de la création de l'utilisateur.";
          console.error('Erreur API - Fonction createUser', err);
        },
        complete: () => {
          this.error = null; 
        }
      });
    }
    

    /*
    Supprime un utilisateur dans la base de données
    */

  deleteUser(user : User) {
    if (this.authService.isAdmin()) {
      this.apiService.deleteUser(user.id).subscribe({
        next: () =>{
          this.users = this.users?.filter(
            (u) => u.id !== user.id
          );
          console.log("Utilisateur supprimé avec succès")
        },
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
      this.addInfoToastDeleteUser();
    } 
  }

  addInfoToastDeleteUser() {
    this._toastService.error('Utilsateur supprimé');
  }
}
