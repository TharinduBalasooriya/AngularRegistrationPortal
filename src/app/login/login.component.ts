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
  isWaiting = false;
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
      this.isWaiting = true;
      this.authService.loginUser(payload.email , payload.password).subscribe((response  ) => {
        if(response){
          this.isWaiting = false;
          //Success toast message
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User Logged In Successfully'});
          //Set token and isLoggedIn to true
        
          this.authService.setToken(response['token']);
          this.authService.setUserId(response['userId']);

         
          //navigate to profile page
          setTimeout(() => {
         
            this.router.navigate(['/profile']);
          }, 1000);
        }
      },(error) => {
        this.isWaiting = false;
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
