import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {badWordsValidator} from './bad-words.validator';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  @Output() reviewSubmitted = new EventEmitter();

  reviewForm = new FormGroup({
    name: new FormControl('', Validators.required),
    review: new FormControl('', [Validators.required, badWordsValidator()]),
    rating: new FormControl(null, Validators.required)
  });

  name = 'something';
  review = null;
  rating = null;
  errors = [];

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errors = [];
    if (this.reviewForm.valid) {
      const productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      };
      this.reviewSubmitted.emit(productReview);

      // reset values
      this.name = null;
      this.review = null;
      this.rating = null;
    } else {
      if (this.reviewForm.get('name').invalid) {
        this.errors.push('Name required');
      }
      if (this.reviewForm.get('review').invalid) {
        this.errors.push('Review required');
      }
      if (this.reviewForm.get('rating').invalid) {
        this.errors.push('Rating required');
      }
    }
  }
}
