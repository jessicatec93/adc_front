import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailResponse } from './schemas/product-detail-response';
import { ProductDetail } from './schemas/product-detail';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product_id = 0;
  product?: ProductDetail;


  constructor(private productService:ProductService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.product_id = this.route.snapshot.params['id'];
    this.getOneProducto();
  };

  getOneProducto() {
    this.productService.getOneProducts(this.product_id).subscribe({
      next: (response) => {
        this.product = response.data;
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
