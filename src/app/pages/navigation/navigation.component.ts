import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userLoggedin = false; // is user already loggedin
  navigations = [ ]; // navigation links

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.updateNavigation();
  }

  updateNavigation() {
    if (this.auth.getLoggedinUser()) {
      this.userLoggedin = true;
    } else {
      this.userLoggedin = false;
    }

    this.navigations = [
      { path: '/', text: 'Home', visible: true },
      { path: '/add', text: 'Add', visible: this.userLoggedin },
      { path: '/login', text: 'Login', visible: !this.userLoggedin },
      { path: '/logout', text: 'Logout', visible: this.userLoggedin },
    ];
  }
}
