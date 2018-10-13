import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { NotFoundComponent } from './pages/not_found/not_found.component';

import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'update/:id', component: AddProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ProductsComponent,
    AddProductComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, // array of routes
      { useHash: true },
      // { enableTracing: true }, // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MaterializeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
