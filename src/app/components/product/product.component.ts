import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() premium;
  @Output() addedToCart = new EventEmitter();
  @Output() removedFromCart = new EventEmitter();

  product = 'Shirts';
  description = 'You should try them!';
  selectedVariant = 0;
  imageTooltip = 'They are awesome!';
  link = 'https://www.google.com/search?q=angular+shirt&tbm=isch';
  onSale = true;
  brand = 'Angular';
  reviews = [];

  details = ['100% cotton', 'White', 'Red logo'];
  sizes = ['large', 'medium', 'small'];
  variants = [
    {
      id: '1',
      color: 'white',
      image: './assets/shirt-white.jpg',
      quantity: 0
    },
    {
      id: '2',
      color: 'blue',
      image: './assets/shirt-blue.jpg',
      quantity: 10
    }
  ];

  get title() {
    return this.brand + ' ' + this.product;
  }

  get image() {
    return this.variants[this.selectedVariant].image;
  }

  get inventory() {
    return this.variants[this.selectedVariant].quantity;
  }

  get sale() {
    if (this.onSale) {
      return `${this.brand} ${this.product} are on sale!`;
    } else {
      return `${this.brand} ${this.product} are not on sale`;
    }
  }

  get shipping() {
    if (this.premium) {
      return 'Free';
    }
    return 4.50;
  }

  addToCart() {
    this.addedToCart.emit(this.variants[this.selectedVariant].id);
  }

  removeFromCart() {
    this.removedFromCart.emit(this.variants[this.selectedVariant].id);
  }

  updateProduct(variantIndex) {
    this.selectedVariant = variantIndex;
  }

  addReview(productReview) {
    this.reviews.push(productReview);
  }

  trackItemFn(item, index) {
    return item.id;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
