import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductInterface } from 'src/app/shared/types/product.interface';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: ProductInterface;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.productService.getById(params['id']);
        })
      )
      .subscribe((product) => {
        this.product = product;
        this.form = new FormGroup({
          type: new FormControl(this.product.type, Validators.required),
          title: new FormControl(this.product.title, Validators.required),
          photo: new FormControl(this.product.photo, Validators.required),
          info: new FormControl(this.product.info, Validators.required),
          price: new FormControl(this.product.price, Validators.required),
        });
      });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitted = true;

    const product: ProductInterface = {
      type: this.form.value['type'],
      title: this.form.value['title'],
      photo: this.form.value['photo'],
      info: this.form.value['info'],
      price: this.form.value['price'],
      date: new Date(),
    };

    this.productService.update({ ...this.product, ...product }).subscribe((res) => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
