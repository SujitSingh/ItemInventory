import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  userModel: UserModel; // model of currently logged user
  adminAccess = false; // flag for admin access
  products: Array<any> = []; // list of all products
  productsList: Array<any> = []; // list of formatted products

  constructor(private auth: AuthService,
              private data: DataService,
              private router: Router
            ) { }

  ngOnInit() {
    this.checkUserAccessLevel();
  }

  checkUserAccessLevel() {
    // check the access level this user
    this.userModel = this.auth.getLoggedinUser();
    // set the access level flag
    this.adminAccess = this.userModel.role === 'admin' ? true : false;

    this.loadAllProducts(); // load list of available products
  }

  loadAllProducts() {
    this.data.getAllProducts()
        .subscribe(
          prodsArr => {
            console.log(prodsArr);
            this.populateProducts(prodsArr); // populate products
          },
          error => {
            console.log(error);
          }
        );
  }

  populateProducts(prodsArr) {
    // filter products depending on user type
    if (this.adminAccess) {
      // user has admin level access. Show all products
      this.products = prodsArr;
    } else {
      // load products specific to current user
      // add product to current array
      this.products = prodsArr.filter(product => {
        return product.user_email === this.userModel.email;
      });
    }

    this.createProductsList();
  }

  createProductsList() {
    // rea-arrange product details array
    let productCount = 0;
    for (const product of this.products) {
      // array for basic elements
      this.productsList.push({
        'basics': [],
        'images': []
      });

      for (const key in product['basics']) {
        if (product['basics'][key].constructor === Object) {
          let newObj = Object.assign({field_key: key}, product['basics'][key]);
          this.productsList[productCount]['basics'].push(newObj);
        }
      }
      // array for image elements
      for (const key in product['images']) {
        if (product['images'][key].constructor === Object) {
          let newObj = Object.assign({field_key: key}, product['images'][key]);
          this.productsList[productCount]['images'].push(newObj);
        }
      }
      productCount++;
    }

    console.log(this.productsList);
  }

  editEntry(product) {
    // edit current response
    console.log(product);
    this.router.navigate(['update/:id']); // if user is not loggedin
  }
}
