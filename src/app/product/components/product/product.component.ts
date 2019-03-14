import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from '../../services/product.service';

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

  sizes = ['large', 'medium', 'small'];
  variants = [
    {
      id: '1',
      color: 'white',
      image: './assets/shirt-white.jpg',
      quantity: 0,
      details: []
    },
    {
      id: '2',
      color: 'blue',
      image: './assets/shirt-blue.jpg',
      quantity: 10,
      details: []
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

  get details() {
    return this.variants[this.selectedVariant].details;
  }

  constructor(public productService: ProductService) {
  }

  fetchProductDetails() {
    for (const variant of this.variants) {
      /* const httpSubscription = */this.productService.getProductDetails(variant.id).subscribe(
        (details: string[]) => {  // success scenario
          variant.details = details;
        },
        (error) => { // error scenario
          console.error('You should not see this error because it is handled in the ProductService!!');
        }
      );

      // setTimeout(() => {
      //   httpSubscription.unsubscribe(); // cancel the Http request
      // }, 800);
    }
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

  ngOnInit() {
    this.fetchProductDetails();
  }
}
