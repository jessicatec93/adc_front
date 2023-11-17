import * as moment from 'moment';
import { Classification } from 'src/app/schemas/classification';
import { ClassificationService } from 'src/app/services/classification.service';
import { Component } from '@angular/core';
import { ProductCreate } from '../product-create/schemas/product-create';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductDetail } from '../product-detail/schemas/product-detail';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  classifications?: Classification[];
  product = new ProductCreate();
  productDetail?: ProductDetail;
  product_id = 0;
  minDate =  moment(new Date()).format('YYYY-MM-DD');
  protected registerForm!: FormGroup;
  protected submitted = false;

  constructor(
    private classificationService: ClassificationService,
    private productService:ProductService,
    private router: Router,
    private readonly formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute
  ){
  }

  ngOnInit():void {
    this.product_id = this.route.snapshot.params['id'];
    this.getOneProducto();
    this.getList('?order=name');
    this.setForm();
  }

  getList(text_search = ''):void {
    this.classificationService.getClassifications(text_search).subscribe({
      next: (response) => {
        this.classifications = response.data;
      },
      error: (e) => console.error(e)
    });
  }

  setForm():void {
    let expiration_at = "";
    if(this.productDetail?.expiration_at){
      expiration_at = moment(new Date(this.productDetail?.expiration_at)).format('YYYY-MM-DD')
    }
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl(this.productDetail?.name, [Validators.required, Validators.minLength(5)]),
        description: new FormControl(this.productDetail?.description ?? "", []),
        price_per_unit: new FormControl(this.productDetail?.price_per_unit ?? 0, [Validators.required, Validators.min(1)]),
        expiration_at: new FormControl(expiration_at, Validators.required),
        classification_id: new FormControl(this.productDetail?.classification?.id ?? "", Validators.required),
        min_amount:  new FormControl(this.productDetail?.min_amount ?? 0, [Validators.required, Validators.min(1)]),
      },
    );
  }

  getOneProducto() {
    this.productService.getOneProducts(this.product_id).subscribe({
      next: (response) => {
        this.productDetail = response.data;
        this.setForm();
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
      this.product.expiration_at = data['expiration_at'] + " 06:00:00";
      this.product.classification_id = data['classification_id'];
      this.product.min_amount = data['min_amount'];
      this.productService.updateProduct(this.product_id, this.product).subscribe({
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
