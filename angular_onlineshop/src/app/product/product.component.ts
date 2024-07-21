import { Component, Input } from '@angular/core';
import { ProductInterface } from '../shared/types/product.interface';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input('product') productProps;

  constructor(private productService: ProductService) {}

  addToCart(product: ProductInterface) {
    this.productService.addToCart(product);
  }
}
