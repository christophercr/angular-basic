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

  errors = [];

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errors = [];
    if (this.reviewForm.valid) {
      const productReview = {
        name: this.reviewForm.get('name').value,
        review: this.reviewForm.get('review').value,
        rating: this.reviewForm.get('rating').value
      };
      this.reviewSubmitted.emit(productReview);

      // reset values
      this.reviewForm.get('name').reset();
      this.reviewForm.get('review').reset();
      this.reviewForm.get('rating').reset();
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
