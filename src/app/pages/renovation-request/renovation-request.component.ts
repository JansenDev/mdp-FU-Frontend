import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-renovation-request',
  templateUrl: './renovation-request.component.html',
  styleUrls: ['./renovation-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RenovationRequestComponent implements OnInit {
  
    formRenovationRequest: FormGroup;

constructor(private formBuilder: FormBuilder,) {
    this.formRenovationRequest = this.formBuilder.group({
        inputClient: ['', null],
        
    })
}

  ngOnInit(): void {
  }

  onSubmitRenovationRequest() {

  }
}
