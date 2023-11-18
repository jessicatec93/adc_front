import * as moment from 'moment';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { OrderStatusService } from '../services/order-status.service';
import { ProductService } from 'src/app/product/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from '../schemas/order_status';
import { OrderService } from '../services/order.service';
import { ProductResum } from 'src/app/product/services/productResum';
import { OrderCreate } from '../order-create/schemas/order-create';
import { OrderDetail } from '../order-detail/schemas/order-detail';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.css'
})
export class OrderUpdateComponent {
  statuses?: OrderStatus[];
  products?: ProductResum[];
  order = new OrderCreate();
  order_id = 0;
  orderDetail?: OrderDetail;
  minDate =  moment(new Date()).format('YYYY-MM-DD');
  protected registerForm!: FormGroup;
  protected submitted = false;

  constructor(
    private orderStatusService: OrderStatusService,
    private orderService: OrderService,
    private productService:ProductService,
    private router: Router,
    private readonly formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute
  ){
  }

  ngOnInit():void {
    this.order_id = this.route.snapshot.params['id'];
    this.getOneorder();
    this.getOrderStatusList('?order=name');
    this.getProductList('?order=name');
    this.setForm();
  }

  getOneorder() {
    this.orderService.getOneOrder(this.order_id).subscribe({
      next: (response) => {
        this.orderDetail = response.data;
        this.setForm();
      },
      error: (e) => console.error(e)
    });
  }

  setForm():void {
    let delivery_at = "";
    let deadline_at = "";
    if(this.orderDetail?.delivery_at){
      delivery_at = moment(new Date(this.orderDetail?.delivery_at)).format('YYYY-MM-DD')
    }
    if(this.orderDetail?.deadline_at){
      deadline_at = moment(new Date(this.orderDetail?.deadline_at)).format('YYYY-MM-DD')
    }
    this.registerForm = this.formBuilder.group(
      {
        deadline_at: new FormControl(deadline_at, [Validators.required]),
        delivery_at: new FormControl(delivery_at, []),
        description: new FormControl(this.orderDetail?.description, []),
        price_per_unit: new FormControl(this.orderDetail?.price_per_unit, [Validators.required, Validators.min(1)]),
        total_price: new FormControl(this.orderDetail?.total_price, [Validators.required, Validators.min(1)]),
        status_id: new FormControl(this.orderDetail?.status?.id, Validators.required),
        product_id: new FormControl(this.orderDetail?.product?.id, Validators.required),
        required_quantity:  new FormControl(this.orderDetail?.required_quantity, [Validators.required, Validators.min(1)]),
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
      this.orderService.updateOrder(this.order_id, this.order).subscribe({
        next: (response) => {
          alert(
            "La orden " + response?.data?.folio + " fue actualizada exitosamente!."
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
