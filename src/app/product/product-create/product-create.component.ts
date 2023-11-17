import * as moment from 'moment';
import { Classification } from 'src/app/schemas/classification';
import { ClassificationService } from 'src/app/services/classification.service';
import { Component } from '@angular/core';
import { ProductCreate } from './schemas/product-create';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
  classifications?: Classification[];
  product = new ProductCreate();
  minDate =  moment(new Date()).format('YYYY-MM-DD');
  protected registerForm!: FormGroup;
  protected submitted = false;

  constructor(
    private classificationService: ClassificationService,
    private productService:ProductService,
    private router: Router,
    private readonly formBuilder: NonNullableFormBuilder,
  ){
  }

  ngOnInit():void {
    this.getList('?order=name');
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl("", [Validators.required, Validators.minLength(5)]),
        description: new FormControl("", []),
        price_per_unit: new FormControl(0, [Validators.required, Validators.min(1)]),
        expiration_at: new FormControl("", Validators.required),
        classification_id: new FormControl("", Validators.required),
        min_amount:  new FormControl(0, [Validators.required, Validators.min(1)]),
      },
    );
  }

  getList(text_search = ''):void {
    this.classificationService.getClassifications(text_search).subscribe({
      next: (response) => {
        this.classifications = response.data;
      },
      error: (e) => console.error(e)
    });
  }

  protected get registerFormControl() {
    return this.registerForm.controls;
  }

  protected onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.product.name = data['name'];
      this.product.description = data['description'] ?? null;
      this.product.price_per_unit = data['price_per_unit'];
      this.product.expiration_at = data['expiration_at']  + " 06:00:00";;
      this.product.classification_id = data['classification_id'];
      this.product.min_amount = data['min_amount'];
      this.productService.createProduct(this.product).subscribe({
        next: (response) => {
          alert(
            "El producto " + response?.data?.folio + " fue registrado exitosamente!."
          );
          this.router.navigate(['/product-list']);
        },
        error: (e) => console.error(e)
      });
    }
  }

  protected resetForm(): void {
    this.registerForm.reset();
  }
}


