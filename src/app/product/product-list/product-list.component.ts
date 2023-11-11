import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
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
  title = 'Órdenes de producción';
  cols = ['Fecha de creación', 'Folio', 'Nombre', 'Fecha de expiración', 'Cantidad almacenada', 'Activo'];


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

}
