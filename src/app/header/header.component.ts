import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {error} from "util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  //@Output() featureSelected = new EventEmitter<string>();
  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  private userSubscription: Subscription;
  private isAuthenticated = false;

  ngOnInit(){
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  onSaveData(){
    //console.log('ahoj');
    this.dataStorageService.saveRecipes();
    //console.log('ahoj');
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
