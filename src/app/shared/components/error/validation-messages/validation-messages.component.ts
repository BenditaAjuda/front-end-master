import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.css']
})
export class ValidationMessagesComponent implements OnInit {

  @Input() errorMessages: string[] | undefined;

  constructor() { }

  ngOnInit() {
  }

}
