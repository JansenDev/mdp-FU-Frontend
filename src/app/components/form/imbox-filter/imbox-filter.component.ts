import { Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-imbox-filter',
  templateUrl: './imbox-filter.component.html',
  styleUrls: ['./imbox-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // useExisting:  ImboxFilterComponent,
      useExisting: forwardRef(() => ImboxFilterComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImboxFilterComponent),
      multi: true,
    },
  ],
})
export class ImboxFilterComponent implements OnInit, ControlValueAccessor {
  formImboxFilter: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formImboxFilter = this.formBuilder.group({
      cboxClient: [''],
      cboxLN: [''],
      inputDocNumber: ['1'],
      inputNames: ['', Validators.required],
      cboxStatus: [''],
    });
  }
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    obj && this.formImboxFilter.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formImboxFilter.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  //* communicate the inner form validation to the parent form
  validate(control: FormControl) {
    console.log(control);

    return this.formImboxFilter.valid
      ? null
      : { formFilter: { valid: false, errors: this.formImboxFilter.errors } };
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formImboxFilter.disable() : this.formImboxFilter.enable();
  }

  ngOnInit(): void {}
}
