import { Component, ViewChild } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './schemas/product';
import { Pagination } from './schemas/Pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css',
  ]
})
export class ProductListComponent {
  pagination?: Pagination;
  products: Product[] = [];
  total_pages: number = 0;
  title = 'Productos';
  page = 1;

  constructor(private productService:ProductService){
  }

  ngOnInit():void {
    this.getList();
  }

  getList(text_search = ''):void {
    this.productService.getProductonOrders(text_search).subscribe({
      next: (response) => {
        this.pagination = response;
        if(response.meta.last_page && response.meta.last_page > 0){
          this.total_pages = response.meta.last_page;
        }
      },
      error: (e) => console.error(e)
    });
  }

  onSearch(text_search = ''):void {
    if(text_search) {
      text_search = '?name=' + text_search;
    }
    this.getList(text_search);
  }

  nextPage():void {
    this.page += 1;
    if(true) {
      const pagination_filter = '?page=' + this.page;
      this.getList(pagination_filter);
    }
  }

  previusPage():void {
    this.page -= 1;
    if(true) {
      const pagination_filter = '?page=' + this.page;
      this.getList(pagination_filter);
    }
  }
}
