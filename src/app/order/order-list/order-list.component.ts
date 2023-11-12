import { Component } from '@angular/core';
import { OrderService } from './order.service';
import { Pagination } from './schemas/Pagination';
import { Order } from './schemas/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  pagination?: Pagination;
  orders: Order[] = [];
  total_pages: number = 0;
  order : { [key: string]: string } = {
    'created_at':'bi bi-caret-down-fill',
    'folio':'bi bi-caret-down-fill',
    'deadline_at':'bi bi-caret-down-fill',
  };
  title = 'Ordenes de Producto';
  page = 1;
  fechaActual = new Date();

  constructor(private orderService:OrderService){
  }

  ngOnInit():void {
    this.getList();
  }

  getList(text_search = ''):void {
    this.orderService.getOrders(text_search).subscribe({
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
      text_search = '?folio=' + text_search;
    }
    this.getList(text_search);
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

  past_date(deadline_string = "", delivery_string = "") {
    const deadline_at = new Date(deadline_string);
    if(delivery_string){
      const delivery_at = new Date(delivery_string);
      return deadline_at <= delivery_at;  
    }
    return deadline_at <= this.fechaActual;
  }

  nextPage():void {
    console.log('entree');
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
}
