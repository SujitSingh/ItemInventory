import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = { email: '', password: '', errorMsg: '' };

  constructor(private auth: AuthService, private data: DataService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.url
        .subscribe(
          urlSegment => {
            if (urlSegment[0].path === 'logout') {
              this.logoutUser();
            }
            else if (this.auth.getLoggedinUser()) {
              // user is already logged in
              this.router.navigate(['/']); // navigate to home page
            }
          }
        );
  }

  loginUser() {
    // fetch all dummy users.
    this.data.getAllUsers().subscribe(
      (usersList: object[]) => {
        this.validateAndLogin(usersList, {email: this.login.email, password: this.login.password});
      },
      error => {
        this.login.errorMsg = 'Error while fetching users list';
      }
    );
  }

  validateAndLogin(allUsers, currentUserObj) {
    // validate and login user. Should be in back-end
    let userMatched = false;
    for (const user of allUsers) { // check entered email from list of users
      if (user.email === currentUserObj.email) {
        console.log(user);
        this.auth.setLoggedUser({name: `${user.full_name} ${user.last_name}`, email: user.email, role: user.role, token: user.token});
        this.router.navigate(['']);
        userMatched = true;
      }
    }
    if (!userMatched) {
      this.login.errorMsg = 'User or password incorrect. Try user "admin@user.com", "user1@user.com"';
    }
  }

  logoutUser() {
    this.auth.logoutUser()
        .subscribe(
          done => { this.router.navigate(['/login']); }
        );
  }

}
