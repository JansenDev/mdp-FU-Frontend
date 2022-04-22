import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IBusinessLine } from 'src/app/core/models/businessLine.model';
import { IClientResponse } from 'src/app/core/models/client.model';
import { CboxService } from 'src/app/core/services/cbox.service';
import { ClientService } from 'src/app/core/services/client.service';

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

  businessLineList: IBusinessLine[] = [] as IBusinessLine[];
  clientList: IClientResponse[] = [] as IClientResponse[];

  constructor(
    private formBuilder: FormBuilder,
    private cboxService: CboxService,
    private clientService: ClientService
  ) {
    this.formImboxFilter = this.formBuilder.group({
      cboxClient: [''],
      cboxLN: [''],
      inputDocNumber: [''],
      inputNames: [''],
      cboxStatus: [''],
    });
  }

  ngOnInit(): void {
    this.fillAllFields();
  }

  fillAllFields() {
    this.fillCboxBussinesLine();
    this.fillCboxClient();
  }

  fillCboxBussinesLine() {
    this.cboxService.findAllBusinessLine().subscribe({
      next: (businessLineList) => {
        this.businessLineList = businessLineList;
      },
    });
  }

  fillCboxClient() {
    this.clientService.findAllClients().subscribe({
      next: (clientList) => {
        this.clientList = clientList;
      },
    });
  }

  // overrides
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
    return this.formImboxFilter.valid
      ? null
      : { formFilter: { valid: false, errors: this.formImboxFilter.errors } };
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formImboxFilter.disable() : this.formImboxFilter.enable();
  }
}
