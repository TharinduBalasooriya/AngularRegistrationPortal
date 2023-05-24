import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService, private messageService: MessageService , private router: Router) {
    this.loginForm = this.formBuilder.group({});
  }
  ngOnInit(): void {
    this.createFormBuilder();
  }

  submitForm(): void {

    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authService.loginUser(payload.email , payload.password).subscribe((response  ) => {
        if(response){
          //Success toast message
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User Logged In Successfully'});
          //Set token and isLoggedIn to true
        
          this.authService.setToken(response['token']);
          this.authService.setUserId(response['userId']);

          console.log(this.authService.getUserId());
          //navigate to profile page
          setTimeout(() => {
            console.log("Navigating to profile page");
            this.router.navigate(['/profile']);
          }, 1000);
        }
      },(error) => {
        console.log(error.error);
        //Error toast message
        this.messageService.add({severity:'error', summary: 'Error', detail: 'User Login Failed : ' + error.error.error});
      });
    } else {
      // Mark form fields as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  createFormBuilder(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
