import { Component } from '@angular/core';
import { Classification } from 'src/app/schemas/classification';
import { ClassificationService } from 'src/app/services/classification.service';
import { ProductCreate } from './schemas/product-create';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  classifications?: Classification[];
  product = new ProductCreate();

  constructor(private classificationService: ClassificationService){
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
  }
}
