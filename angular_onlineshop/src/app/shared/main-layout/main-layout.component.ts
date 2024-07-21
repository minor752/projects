import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  type = 'phone';

  constructor(private router: Router, private productService: ProductService) {}

  setType(type: string) {
    this.type = type;

    if (this.type !== 'cart') {
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type,
        },
      });

      this.productService.setType(this.type);
    }
  }
}
