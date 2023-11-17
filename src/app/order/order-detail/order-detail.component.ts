import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetail } from './schemas/order-detail';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  order_id = 0;
  order?: OrderDetail;

  constructor(private orderService:OrderService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.order_id = this.route.snapshot.params['id'];
    this.getOneordero();
  };

  getOneordero() {
    this.orderService.getOneOrder(this.order_id).subscribe({
      next: (response) => {
        this.order = response.data;
      },
      error: (e) => console.error(e)
    });
  }

  valBool(valBool: boolean = false):string {
    if( valBool ) {
      return 'Si';
    }
    return 'No';
  }
}
