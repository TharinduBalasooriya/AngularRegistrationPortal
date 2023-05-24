import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { User } from '../models/User.type';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {

  user ?: User ;
  constructor(private authService: AuthServiceService , private router: Router , private messageService: MessageService){

  }
  ngOnInit(): void {
    if(!this.authService.getIsLoggedIn()){
      //Navigate to login page
      this.router.navigate(['/login']);
    }
    this.getUserDetails();
  }

  getUserDetails(){
    //Get user details from backend
    this.authService.getUserDetails(this.authService.getUserId()).subscribe((response) => {
      if(response){
        this.user = response;
      }
      
    },(error) => {
      //Error toast message
      this.messageService.add({severity:'error', summary: 'Error', detail: 'User Details Fetch Failed : ' + error.error.error});
    });
  }
  signOut(): void {
    //Clear token and isLoggedIn
    //Navigate to login page
    this.authService.setToken('');
    this.authService.setUserId(-1);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'User Logged Out Successfully'});
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
