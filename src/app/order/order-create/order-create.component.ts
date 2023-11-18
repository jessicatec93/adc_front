import * as moment from 'moment';
import { Component } from '@angular/core';
import { OrderCreate } from './schemas/order-create';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { OrderStatusService } from '../services/order-status.service';
import { ProductService } from 'src/app/product/services/product.service';
import { Router } from '@angular/router';
import { OrderStatus } from '../schemas/order_status';
import { OrderService } from '../services/order.service';
import { ProductResum } from 'src/app/product/services/productResum';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent {
  order = new OrderCreate();
  statuses?: OrderStatus[];
  products?: ProductResum[];
  minDate =  moment(new Date()).format('YYYY-MM-DD');
  protected submitted = false;

  constructor(
    private orderStatusService: OrderStatusService,
    private orderService: OrderService,
    private productService:ProductService,
    private router: Router,
  ){
  }

  ngOnInit():void {
    this.getOrderStatusList('?order=name');
  }

  getOrderStatusList(text_search = ''):void {
    this.orderStatusService.getOrderStatuses(text_search).subscribe({
      next: (response) => {
        this.statuses = response.data;
      },
      error: (e) => console.error(e)
    });
  }

  getProductListResum(text_search = ''):void {
    this.productService.getProductsResum(text_search).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (e) => console.error(e)
    });
  }

}
