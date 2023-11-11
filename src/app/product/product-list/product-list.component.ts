import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { Product } from './schemas/product';
import { Pagination } from './schemas/Pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pagination?: Pagination;
  products: Product[] = [];
  title = 'Órdenes de producción';


  constructor(private productService:ProductService){
  }

  ngOnInit():void{
    this.productService.getProductonOrders().subscribe({
      next: (response) => {
        this.pagination = response;
        console.log(response);
        console.log(this.pagination);
        console.log(this.pagination.data);
        console.log(this.pagination.data[0].id);
      },
      error: (e) => console.error(e)
    });
  }

}
