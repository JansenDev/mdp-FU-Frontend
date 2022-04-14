import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { setToken } from 'src/app/core/utils/token.storage';

@Component({
  selector: 'app-hiring-request',
  templateUrl: './hiring-request.component.html',
  styleUrls: ['./hiring-request.component.scss'],
})
export class HiringRequestComponent implements OnInit {
  formHiringRequest: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // setToken({ id_sesion: 1 });

    this.formHiringRequest = this.formBuilder.group({
      cBoxDocumentType: ['DNI'],
      inputDocumentNumber: ['', [Validators.pattern(/^\d{8}$/)]],
      inputNameColl: ['', [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputLastname: ['', [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputLastnameMt: ['', [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)]],
      inputBithDate: ['', Validators.required],
      inputPhone: ['', [Validators.pattern(/^\d{9}$/)]],
      inputEmail: ['', [Validators.email]],
      inputAddress: ['', Validators.required],
      inputProvince: ['', Validators.required],
      inputDistrict: ['', Validators.required],
      // contract
      cBoxClient: ['', Validators.required],
      cBoxBusinessLine: ['', Validators.required],
      cBoxProfile: ['', Validators.required],
      cBoxLevel: ['', Validators.required],
      inputSalaryBand: ['', Validators.pattern(/^\d{3,5}$/)],
      cBoxmodality: ['', Validators.required],
      inputRemuneration: ['', Validators.pattern(/^\d{3,5}$/)],
      inputMonthlyBonus: ['', Validators.pattern(/^\d{3,5}$/)],
      rbEPS: [''],
      rbSCTR: [''],
      inputDateStart: ['', Validators.required],
      inputDateEnd: ['', Validators.required],
      inputCondition: [''],
    });
  }

  ngOnInit(): void {}

  onSubmitHiringRquest() {
    if (this.formHiringRequest.valid) {
      console.log('Submit hiring request');
    } else {
      console.log('Buen intento prro');
    }
  }

  onCancel() {
    this.cleanForm();
  }
  //* utilities
  cleanForm() {
    this.formHiringRequest.reset({
      cBoxDocumentType: 'DNI',
    });
  }
}
