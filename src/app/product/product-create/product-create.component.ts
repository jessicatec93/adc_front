import { Component } from '@angular/core';
import { Classification } from 'src/app/schemas/classification';
import { ClassificationService } from 'src/app/services/classification.service';
import { ProductCreate } from './schemas/product-create';
import * as moment from 'moment';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  classifications?: Classification[];
  product = new ProductCreate();
  minDate =  moment(new Date()).format('YYYY-MM-DD');

  constructor(
    private classificationService: ClassificationService,
    private productService:ProductService,
    private router: Router
  ){
  }

  ngOnInit():void {
    this.getList('?order=name');
  }

  getList(text_search = ''):void {
    this.classificationService.getClassifications(text_search).subscribe({
      next: (response) => {
        this.classifications = response.data;
      },
      error: (e) => console.error(e)
    });
  }

  save(){
    console.log('enviado exitosamente');
    console.log(this.product);
    this.productService.createProduct(this.product).subscribe({
      next: (response) => {
        console.log(response?.data?.id);
        this.router.navigate(['/product-list']);
      },
      error: (e) => console.error(e)
    });
  }
}
