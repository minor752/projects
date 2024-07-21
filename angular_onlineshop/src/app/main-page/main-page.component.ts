import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$: Observable<any[]>

  constructor(public productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.productService.getAll()
  }
}
