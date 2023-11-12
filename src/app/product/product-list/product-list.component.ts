import { Component, ViewChild } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './schemas/product';
import { Pagination } from './schemas/Pagination';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css',
  ]
})
export class ProductListComponent {
  pagination?: Pagination;
  products: Product[] = [];
  title = 'Productos';

  constructor(private productService:ProductService){
  }

  ngOnInit():void{
    this.productService.getProductonOrders().subscribe({
      next: (response) => {
        this.pagination = response;
      },
      error: (e) => console.error(e)
    });
  }

  onSearch(text_search = ''):void{
    if(text_search) {
      this.productService.getProductonOrders(text_search).subscribe({
        next: (response) => {
          this.pagination = response;
        },
        error: (e) => console.error(e)
      });
    }
  }
}
