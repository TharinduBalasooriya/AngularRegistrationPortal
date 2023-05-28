import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registrationForm: FormGroup;
  isWaiting = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService , private messageService: MessageService , private router: Router) {
    this.registrationForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required , Validators.minLength(8)]]
    });
  }



  submitForm(): void {
 
    if (this.registrationForm.valid) {
      const payload = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password
      };
  
      this.isWaiting = true;
      this.authService.signUpUser(payload).subscribe((response) => {
        this.isWaiting = false;
        if(response){
         //Success toast message
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User Registered Successfully'});
         
          /**
           * Wait & Navigate to login page
           */
          setTimeout(() => {
           this.router.navigate(['/login']);
          }, 2000);
        }
      },(error) => {
        this.isWaiting = false;
        
     
        //Error toast message
        this.messageService.add({severity:'error', summary: 'Error', detail: 'User Registration Failed : ' + error.error.error});
      });
    } else {
      // Mark form fields as touched to display validation errors
      this.registrationForm.markAllAsTouched();
    }
  }

}
