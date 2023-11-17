import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { TechnicalSupportComponent } from './technical-support/technical-support.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderUpdateComponent } from './order/order-update/order-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-create', component: ProductCreateComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'product-update/:id', component: ProductUpdateComponent},
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-create', component: OrderCreateComponent},
  { path: 'order-detail/:id', component: OrderDetailComponent},
  { path: 'order-update/:id', component: OrderUpdateComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'technical-support', component: TechnicalSupportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }