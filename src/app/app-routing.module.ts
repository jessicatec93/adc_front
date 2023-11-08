import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full' },
  {path:'/product-list', component: ProductListComponent},
  {path:'/order-list', component: OrderListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
