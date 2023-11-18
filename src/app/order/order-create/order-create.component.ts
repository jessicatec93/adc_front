import * as moment from 'moment';
import { Component } from '@angular/core';
import { OrderCreate } from './schemas/order-create';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { OrderStatusService } from '../services/order-status.service';
import { ProductService } from 'src/app/product/services/product.service';
import { Router } from '@angular/router';
import { OrderStatus } from '../schemas/order_status';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent {
  order = new OrderCreate();
  statuses?: OrderStatus[];
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

  //protected onSubmit(): void {
  //  this.submitted = true;
//
  //  if (this.orderForm.valid) {
  //    const data = this.orderForm.value;
  //    this.order.delivery_at = data['delivery_at']? data['delivery_at']  + " 06:00:00": '';
  //    this.order.deadline_at = data['deadline_at']  + " 06:00:00";
  //    this.order.description = data['description'] ?? '';
  //    this.order.price_per_unit = data['price_per_unit'];
  //    this.order.total_price = data['total_price'];
  //    this.order.required_quantity = data['required_quantity'];
  //    this.order.status_id = data['status_id'];
  //    this.order.product_id = data['product_id'];
  //    this.orderService.createOrder(this.order).subscribe({
  //      next: (response) => {
  //        alert(
  //          "La orden " + response?.data?.folio + " fue registrado exitosamente!."
  //        );
  //        this.router.navigate(['/order-list']);
  //      },
  //      error: (e) => console.error(e)
  //    });
  //  }
  //}

  //protected resetForm(): void {
  //  this.orderForm.reset();
  //}
}
