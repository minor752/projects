import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ProductInterface } from '../shared/types/product.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartProducts: ProductInterface[] = [];
  totalPrice = 0;
  added = '';

  form: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.cartProducts;

    for (let index = 0; index < this.cartProducts.length; index++) {
      this.totalPrice += +this.cartProducts[index].price;
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitted = true;

    const order = {
      name: this.form.value['name'],
      phone: this.form.value['phone'],
      address: this.form.value['address'],
      payment: this.form.value['payment'],
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date(),
    };

    console.log(this.form);

    this.orderService.create(order).subscribe((res) => {
      this.form.reset();
      this.added = 'Delivery is framed';
      this.submitted = false;
    });
  }

  deleteFromCart(product: ProductInterface) {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }
}
