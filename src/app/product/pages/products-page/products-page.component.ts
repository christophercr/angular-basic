import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  premium = true;
  cart = [];

  updateCart(id) {
    this.cart.push(id);
  }

  removeFromCart(id) {
    const idx = this.cart.indexOf(id);
    if (idx !== -1) {
      this.cart.splice(idx, 1);
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
