import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contract-imbox',
  templateUrl: './contract-imbox.component.html',
  styleUrls: ['./contract-imbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractImboxComponent implements OnInit {
  formFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formFilter = this.formBuilder.group({
      filterForm: [
        {
          cboxClient: '',
          cboxLN: '',
          inputDocNumber: '',
          inputNames: '',
          cboxStatus: '',
        },
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {}

  ngSubmit() {
    console.log('send filtered');
  }
}
