import * as moment from 'moment';
import { Component } from '@angular/core';
import { OrderCreate } from './schemas/order-create';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { OrderStatusService } from '../services/order-status.service';
import { ProductService } from 'src/app/product/services/product.service';
import { Router } from '@angular/router';
import { OrderStatus } from '../schemas/order_status';
import { OrderService } from '../services/order.service';
import { ProductResum } from 'src/app/product/services/productResum';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {
  statuses?: OrderStatus[];
  products?: ProductResum[];
  order = new OrderCreate();
  minDate =  moment(new Date()).format('YYYY-MM-DD');
  protected registerForm!: FormGroup;
  protected submitted = false;

  constructor(
    private orderStatusService: OrderStatusService,
    private orderService: OrderService,
    private productService:ProductService,
    private router: Router,
    private readonly formBuilder: NonNullableFormBuilder
  ){
  }

  ngOnInit():void {
    this.getOrderStatusList('?order=name');
    this.getProductList('?order=name');
    this.registerForm = this.formBuilder.group(
      {
        deadline_at: new FormControl("", [Validators.required]),
        delivery_at: new FormControl("", []),
        description: new FormControl("", []),
        price_per_unit: new FormControl(0, [Validators.required, Validators.min(1)]),
        total_price: new FormControl(0, [Validators.required, Validators.min(1)]),
        status_id: new FormControl("", Validators.required),
        product_id: new FormControl("", Validators.required),
        required_quantity:  new FormControl(0, [Validators.required, Validators.min(1)]),
      },
    );
  }

  getOrderStatusList(text_search = ''):void {
    this.orderStatusService.getOrderStatuses(text_search).subscribe({
      next: (response) => {
        this.statuses = response.data;
      },
      error: (e) => console.error(e)
    });
  }

  getProductList(text_search = ''):void {
    this.productService.getProductsResum(text_search).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (e) => console.error(e)
    });
  }

  protected get registerFormControl() {
    return this.registerForm.controls;
  }

  protected onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.order.delivery_at = data['delivery_at']? data['delivery_at']  + " 06:00:00": '';
      this.order.deadline_at = data['deadline_at']  + " 06:00:00";
      this.order.description = data['description'] ?? '';
      this.order.price_per_unit = data['price_per_unit'];
      this.order.total_price = data['total_price'];
      this.order.required_quantity = data['required_quantity'];
      this.order.status_id = data['status_id'];
      this.order.product_id = data['product_id'];
      this.orderService.createOrder(this.order).subscribe({
        next: (response) => {
          alert(
            "La orden " + response?.data?.folio + " fue registrado exitosamente!."
          );
          this.router.navigate(['/order-list']);
        },
        error: (e) => console.error(e)
      });
    }
  }

  protected resetForm(): void {
    this.registerForm.reset();
  }
}
