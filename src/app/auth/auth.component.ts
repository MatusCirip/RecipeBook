import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  logInMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.logInMode = !this.logInMode;
  }

  onSubmitAuth(form: NgForm){
    if (!form.valid){
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    if (this.logInMode){
      this.authService.login(email, password).subscribe(response => {
        //console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, error => {
        this.errorMessage = error;
        this.isLoading = false;
      });
    } else {
      this.authService.signup(email, password).subscribe(response => {
        //console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, error => {
        this.errorMessage = error;
        this.isLoading = false;
      });
    }
    form.reset();
  }
}
