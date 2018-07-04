import { Component, OnInit } from '@angular/core';
import { ValidateservicesService } from 'services/validateservices.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'services/auth.service';
import { Subscriber } from 'rxjs/Subscriber';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(private validateService: ValidateservicesService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password

    }

    //Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please fill all fields", { cssClass: 'alert-danger', timeout: 3000 });

      return false;
    }
    //Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please  use a valid email", { cssClass: 'alert-danger', timeout: 3000 });

      return false;
    }
    //Register User
    //Since it is in observable use subscribe to it
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("U r now registered and can log in", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });

        this.router.navigate(['/register']);
      }
    });
  }
}
