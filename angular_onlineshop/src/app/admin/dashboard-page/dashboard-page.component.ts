import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products = [];
  productSubs: Subscription;
  removeSubs: Subscription;

  productName = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productSubs = this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    if (this.productSubs) {
      this.productSubs.unsubscribe();
    }

    if (this.removeSubs) {
      this.removeSubs.unsubscribe();
    }
  }

  remove(id) {
    this.removeSubs = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter((product) => product != id);
    });
  }
}
