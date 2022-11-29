import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-electricity-bill',
  templateUrl: './electricity-bill.component.html',
  styleUrls: ['./electricity-bill.component.scss'],
})
export class ElectricityBillComponent implements OnInit {
  @Input() date: string = "01/02/1999";

  constructor() { }

  ngOnInit() {}

}
