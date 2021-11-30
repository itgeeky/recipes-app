import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import * as AuthActions from '../auth/store/auth.actions'
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    private userSub:Subscription;
    isAuth = false;
    constructor(private store : Store<fromApp.AppState>){}


    ngOnInit(){
        this.userSub=this.store.select('auth').pipe(map(authState => {
          return authState.user
        })).subscribe(user =>{
            this.isAuth = !user ? false : true ;
        });
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    onFetchData(){
        // this.data.fetchRecipes().subscribe();
        this.store.dispatch(RecipesActions.fetchRecipes())
    }

    onSaveData(){
      this.store.dispatch(RecipesActions.storeRecipes());
  }

    onLogout(){
        this.store.dispatch(AuthActions.logout())
    }

}
