import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  loggedUser: UserModel;
  product: any; // product object
  updateDetails = false; // flag for update product details

  constructor(private router: Router,
              private actRoute: ActivatedRoute,
              private auth: AuthService,
              private data: DataService) { }

  ngOnInit() {
    this.loggedUser = this.auth.getLoggedinUser();
    if (!this.loggedUser) {
      this.router.navigate(['/']); // if user is not loggedin
      return;
    }

    this.data.getAllProducts().subscribe(
      dataArr => {
        this.product = dataArr[0];
        console.log(this.product);
      },
      error => {
        console.log(error);
      }
    );
  }



}
