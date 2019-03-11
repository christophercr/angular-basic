import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.css']
})
export class ProductTabsComponent implements OnInit {

  @Input() reviews;

  tabs = ['Reviews', 'Make a Review'];
  selectedTab = 'Reviews';

  constructor() {
  }

  ngOnInit() {
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

}
