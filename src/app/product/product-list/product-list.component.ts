import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from './schemas/product';
import { Pagination } from './schemas/pagination';

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
  order : { [key: string]: string } = {
    'created_at':'bi bi-caret-down-fill',
    'folio':'bi bi-caret-down-fill',
    'name':'bi bi-caret-down-fill',
    'expiration_at':'bi bi-caret-down-fill',
  };
  title = 'Productos';
  page = 1;
  fechaActual = new Date();

  constructor(private productService:ProductService){
  }

  ngOnInit():void {
    this.getList();
  }

  getList(text_search = ''):void {
    this.productService.getProducts(text_search).subscribe({
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

  past_date(date_string = "") {
    const date = new Date(date_string);
    return date < this.fechaActual;
  }

  sort(column = ""){
    if(column != ""){
      let sort = 'asc';
      if(this.order[column] == 'bi bi-caret-up-fill'){
        this.order[column] = 'bi bi-caret-down-fill';
      } else {
        this.order[column] = 'bi bi-caret-up-fill';
        sort = 'desc';
      }
      const pagination_filter = '?sort=' + sort + '&&order=' + column;
      this.getList(pagination_filter);
    }
  }

  quantity_valid(storage = 0, min_amount=0) {
    return storage < min_amount;
  }

  nextPage():void {
    if(this.page < this.total_pages) {
      this.page += 1;
      const pagination_filter = '?page=' + this.page;
      this.getList(pagination_filter);
    }
  }

  previusPage():void {
    if( this.page > 1) {
      this.page -= 1;
      const pagination_filter = '?page=' + this.page;
      this.getList(pagination_filter);
    }
  }

  valBool(valBool: boolean = false):string {
    if( valBool ) {
      return 'Si';
    }
    return 'No';
  }

  delete(id: number = 0, folio: string = '') {
    if(window.confirm('Estas seguro de eliminar el producto ' + folio + '?')){
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          if(response?.data?.folio){
            this.ngOnInit();
          }
        },
        error: (e) => console.error(e)
      });

     }
  }
}
