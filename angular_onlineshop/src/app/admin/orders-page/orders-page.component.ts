import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit {
  orders = [];
  orderSubs: Subscription | null;
  removeSubs: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderSubs = this.orderService.getAll().subscribe((orders) => {
      this.orders = orders;
    });
  }

  ngOnDestroy(): void {
    if (this.orderSubs) {
      this.orderSubs.unsubscribe();
    }

    if (this.removeSubs) {
      this.removeSubs.unsubscribe();
    }
  }

  remove(id) {
    this.removeSubs = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter((order) => order.id != id);
    });
  }
}
