import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
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
}
