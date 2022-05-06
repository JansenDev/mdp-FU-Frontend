import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISalaryBandReponse } from 'src/app/core/models/salaryBand.model';
import { CboxService } from 'src/app/core/services/cbox.service';
import { ContractImboxService } from 'src/app/core/services/contract-imbox.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { getToken } from 'src/app/core/utils/token.storage';
import * as util from '../../core/utils/utilities.util';
import Swal from 'sweetalert2';
import { IHiringRequest } from 'src/app/core/models/hiring-request.model';
import { HiringRequestService } from 'src/app/core/services/hiring-request.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT_TYPY_LENGTH } from 'src/app/core/constants/resource.constants';

const { base } = environment;
const GG = 'GERENTE_GENERAL';
const RRHH = 'JEFE_DE_RECURSOS_HUMANOS';

@Component({
  selector: 'app-approve-hiring-request',
  templateUrl: './approve-hiring-request.component.html',
  styleUrls: ['./approve-hiring-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApproveHiringRequestComponent implements OnInit {
  formApproveHiringRequest: FormGroup;

  salaryBandObj: ISalaryBandReponse = {
    cod_banda_salarial: null,
    maximo: 0,
    minimo: 0,
  };

  statusHiringRequest = '';

  fileCv: any = undefined;
  cvHas: string | null = null;
  documentMaxLength: number = DOCUMENT_TYPY_LENGTH['DNI'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contractImboxService: ContractImboxService,
    private activatedRoute: ActivatedRoute,
    private cboxService: CboxService,
    private notification: NotificationService,
    private hiringRequestService: HiringRequestService
  ) {
    this.formApproveHiringRequest = this.formBuilder.group({
      inputIdHiringRequest: [{ value: null, disabled: true }],
      cBoxDocumentType: [{ value: null, disabled: false }],
      inputDocumentNumber: [
        { value: null, disabled: false },
        [Validators.pattern(/^\d{8,15}$/)],
      ],
      inputNameColl: [
        { value: null, disabled: false },
        [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)],
      ],
      inputLastname: [
        { value: null, disabled: false },
        [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)],
      ],
      inputLastnameMt: [
        { value: null, disabled: false },
        [Validators.pattern(/^[a-zA-ZÑñ\s]{3,}$/)],
      ],
      inputBithDate: [{ value: null, disabled: false }, Validators.required],
      inputPhone: [
        { value: null, disabled: false },
        [Validators.pattern(/^\d{9,11}$/)],
      ],
      inputEmail: [{ value: null, disabled: false }, Validators.email],
      inputAddress: [{ value: null, disabled: false }, Validators.required],
      inputDistrict: [{ value: null, disabled: false }, Validators.required],
      inputProvince: [{ value: null, disabled: false }, Validators.required],
      // contract
      cBoxClient: [{ value: null, disabled: true }],
      cBoxBusinessLine: [{ value: null, disabled: true }],
      cBoxProfile: [{ value: null, disabled: true }],
      cBoxLevel: [{ value: null, disabled: true }],
      cBoxmodality: [{ value: null, disabled: true }],
      inputRemuneration: [{ value: null, disabled: true }],
      inputMonthlyBonus: [{ value: null, disabled: true }],
      cBoxEPS: [{ value: null, disabled: true }],
      cBoxBearCost: [{ value: null, disabled: true }],
      rbSCTR: [{ value: false, disabled: true }],
      inputDateStart: [{ value: null, disabled: true }],
      inputDateEnd: [{ value: null, disabled: true }],
      inputCondition: [{ value: null, disabled: true }],
      cboxAsig: [false],

      // ajustes

      cboxCompany: [null, [Validators.required]],
      cboxSex: [null, Validators.required],
      inputArea: [{ value: null, disabled: true }],
      inputWorkingHours: [{ value: null, disabled: true }],
      inputTarifa: [{ value: null, disabled: true }],
      inputProductivity: [{ value: null, disabled: true }],
      inputTeamAsignment: [{ value: null, disabled: true }],
      inputJefeResponsable: [{ value: null, disabled: true }],
      inputReasonReject: [null],
    });
  }
  ngOnInit(): void {
    this.getHiringRequestDetail();
    this.onChangeCboxDocumentType$();
    this.setDefaultDisableRRHH();
  }

  onChangeCboxDocumentType$() {
    this.formApproveHiringRequest.controls[
      'cBoxDocumentType'
    ].valueChanges.subscribe({
      next: (documentType) => {
        const type = documentType as keyof typeof DOCUMENT_TYPY_LENGTH;

        this.documentMaxLength = DOCUMENT_TYPY_LENGTH[type];
      },
    });
  }

  getFormBody(): Partial<IHiringRequest> {
    const pathParams = this.activatedRoute.snapshot.paramMap;
    const idHiringRequest = pathParams.get('idHiringRequest')!;
    const {
      cboxAsig,
      cboxCompany,
      cboxSex,
      inputAddress,
      inputBithDate,
      inputDistrict,
      inputDocumentNumber,
      inputEmail,
      inputLastname,
      inputLastnameMt,
      inputNameColl,
      inputPhone,
      inputProvince,
      cBoxDocumentType,
    } = this.formApproveHiringRequest.value;

    const formData: Partial<IHiringRequest> = {
      ind_asign_familiar: cboxAsig,
      empresa: cboxCompany,
      sexo: cboxSex,
      direccion: inputAddress,
      fecha_nacimiento: util.timestampFormat(inputBithDate)!,
      distrito: inputDistrict,
      nro_documento: inputDocumentNumber,
      correo: inputEmail,
      ape_paterno: inputLastname,
      ape_materno: inputLastnameMt,
      nombre: inputNameColl,
      nro_celular: inputPhone,
      provincia: inputProvince,
      tipo_documento: cBoxDocumentType,
      cod_solicitud_contratacion: parseInt(idHiringRequest),
    };
    return formData;
  }

  disabledFields() {
    this.formApproveHiringRequest.disable();
  }

  upload($event: any) {
    if ($event.target.files.length > 0) {
      const [file] = $event.target.files;

      this.fileCv = {
        file: file,
        filename: file.name,
      };

      console.log(this.fileCv);
      return;
    }
    this.fileCv = undefined;
    console.log(this.fileCv);
  }

  onApproveGG(idHiringRequest: string | number): void {
    Swal.fire({
      title: 'Confirme Aprobación',
      // text: "Aceptar Aprobacion",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.approveGGRequest(idHiringRequest);
      }
    });
  }

  private approveGGRequest(idHiringRequest: string | number) {
    this.contractImboxService
      .approveGGHiringRequest(idHiringRequest)
      .subscribe({
        next: (status) => {
          this.notification.toast(
            'success',
            'Solicitud Aceptada ',
            'SUCCESS',
            5000
          );

          this.backPage();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.notification.toast('error', err.error.message, 'ERROR', 5000);
        },
      });
  }

  onApprove(idHiringRequest: string | number): void {
    Swal.fire({
      title: 'Confirme Aprobación',
      // text: "Aceptar Aprobacion",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.uploadChangesAndCv(idHiringRequest);
      }
    });
  }

  private uploadChangesAndCv(idHiringRequest: string | number) {
    if (this.fileCv) {
      this.hiringRequestService
        .uploadCv(this.fileCv)
        .subscribe((uploadResponse) => {
          console.log(uploadResponse);
          if (uploadResponse.error) {
            this.notification.toast(
              'error',
              uploadResponse.message,
              'ERROR',
              7000
            );
            return;
          }
          this.editRequest(idHiringRequest);
        });
    }

    this.editRequest(idHiringRequest);
  }

  private editRequest(idHiringRequest: string | number) {
    const formData = this.getFormBody();

    this.contractImboxService
      .editHiringRequest(idHiringRequest, formData)
      .subscribe((response) => {
        console.log(response);

        if (response.error) {
          this.notification.toast('error', response.message, 'ERROR', 5000);
          return;
        }
        this.approveRequest(idHiringRequest);
      });
  }

  private approveRequest(idHiringRequest: string | number) {
    const asig_family: boolean =
      this.formApproveHiringRequest.controls['cboxAsig'].value;

    this.contractImboxService
      .approveHiringRequest(idHiringRequest, asig_family)
      .subscribe({
        next: (status) => {
          this.notification.toast(
            'success',
            'Solicitud Aceptada ',
            'SUCCESS',
            5000
          );

          this.backPage();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.notification.toast('error', err.error.message, 'ERROR', 5000);
        },
      });
  }

  onReject(idHiringRequest: string | number): void {
    this.formApproveHiringRequest.controls['inputReasonReject'].setErrors({
      error: true,
    });
    Swal.fire({
      title: 'Confirmar "Rechazo" de Solicitud',
      // text: "Aceptar Aprobacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rejectRequest(idHiringRequest);
      }
    });
  }

  private rejectRequest(idHiringRequest: string | number) {
    const reasonReject: string =
      this.formApproveHiringRequest.controls['inputReasonReject'].value;

    if (reasonReject || reasonReject !== null) {
      this.contractImboxService
        .rejectHiringRequest(idHiringRequest, reasonReject)
        .subscribe({
          next: (status) => {
            this.notification.toast(
              'info',
              'Solicitud Rechazada',
              'SUCCESS',
              5000
            );
            this.formApproveHiringRequest.controls[
              'inputReasonReject'
            ].setErrors(null);
            this.backPage();
          },
          error: (err: HttpErrorResponse) => {
            this.notification.toast('error', err.error.message, 'ERROR', 5000);
          },
        });
    } else {
      this.notification.toast('info', 'Indique motivo de Rechazo', 'INFO');
    }
  }

  onCancel(): void {
    this.router.navigate(['contract-imbox']);
  }

  getHiringRequestDetail(): void {
    const pathParams = this.activatedRoute.snapshot.paramMap;

    const idHiringRequest = pathParams.get('idHiringRequest')!;

    this.contractImboxService
      .getHiringRequestById(idHiringRequest)
      .subscribe((hiringRequestSelected) => {
        this.cboxService
          .findSalaryBandByIdProfileAndLevel(
            hiringRequestSelected.cod_puesto,
            hiringRequestSelected.nivel
          )
          .subscribe((salaryBandFound) => {
            this.salaryBandObj = salaryBandFound[0];
          });

        const nulo = '--';

        let monthlyBonus = hiringRequestSelected.bono_men
          ? hiringRequestSelected.bono_men
          : nulo;

        let condicional_adicional = hiringRequestSelected.condicional_adicional
          ? hiringRequestSelected.condicional_adicional
          : nulo;

        let ape_paterno = util.toCapitalizeFirstLetterCase(
          hiringRequestSelected.ape_paterno
        );

        let ape_materno = util.toCapitalizeFirstLetterCase(
          hiringRequestSelected.ape_materno
        );

        let nombre = util.toCapitalizeFirstLetterCase(
          hiringRequestSelected.nombre
        );

        let fecha_fin = util.timestampFormat(
          hiringRequestSelected.fecha_fin,
          'DD-MM-YYYY'
        );

        let fecha_inicio = util.timestampFormat(
          hiringRequestSelected.fecha_inicio,
          'DD-MM-YYYY'
        );

        let fecha_nacimiento = util.timestampFormat(
          hiringRequestSelected.fecha_nacimiento
        );

        let ind_asign_familiar: boolean =
          hiringRequestSelected.ind_asign_familiar == 'S' ? true : false;

        this.formApproveHiringRequest.patchValue({
          cBoxBusinessLine: hiringRequestSelected.cod_linea_negocio,
          cBoxClient: hiringRequestSelected.nombre_corto!.toUpperCase(),
          cBoxDocumentType: hiringRequestSelected.tipo_documento,
          cBoxLevel: hiringRequestSelected.nivel.toUpperCase(),
          cBoxProfile: hiringRequestSelected.puesto!.toUpperCase(),
          cBoxmodality: hiringRequestSelected.modalidad.toUpperCase(),

          inputAddress: hiringRequestSelected.direccion.toUpperCase(),
          inputBithDate: fecha_nacimiento,
          inputCondition: condicional_adicional,
          inputDateEnd: fecha_fin,
          inputDateStart: fecha_inicio,
          inputDistrict: hiringRequestSelected.distrito.toUpperCase(),
          inputDocumentNumber: hiringRequestSelected.nro_documento,
          inputEmail: hiringRequestSelected.correo.toLowerCase(),
          inputIdHiringRequest:
            hiringRequestSelected.cod_solicitud_contratacion,
          inputLastname: ape_paterno,
          inputLastnameMt: ape_materno,
          inputNameColl: nombre,
          inputMonthlyBonus: monthlyBonus,
          inputPhone: hiringRequestSelected.nro_celular,
          inputProvince: hiringRequestSelected.provincia.toUpperCase(),
          inputRemuneration: hiringRequestSelected.remuneracion,
          cboxAsig: ind_asign_familiar,

          // ajustes

          cboxCompany: hiringRequestSelected.empresa,
          cboxSex: hiringRequestSelected.sexo,
          inputArea: hiringRequestSelected.condicion_proyecto_area,
          inputWorkingHours: hiringRequestSelected.horario_laboral,
          inputTarifa: hiringRequestSelected.tarifa_mensual,
          inputProductivity: hiringRequestSelected.productividad,
          inputTeamAsignment: hiringRequestSelected.asignacion_equipo,
          inputJefeResponsable: hiringRequestSelected.jefe_responsable_directo,

          inputReasonReject: hiringRequestSelected.motivo_rechazo,
        });
        this.statusHiringRequest = hiringRequestSelected.estado!;

        this.cvHas = hiringRequestSelected.cv!;
        this.disableFieldsByStatus(this.statusHiringRequest);
      });
  }

  // utils

  get idHiringRequest() {
    return this.formApproveHiringRequest.controls['inputIdHiringRequest'].value;
  }

  get businessLineValue() {
    return this.formApproveHiringRequest.controls['cBoxBusinessLine'].value;
  }

  private backPage() {
    this.router.navigate(['contract-imbox']);
  }

  private get userProfile() {
    const { userProfile } = getToken();
    return userProfile;
  }

  isPendingHiringRequestRRHH(pendingStatus: string): boolean {
    let status = false;
    // RRHH

    if (pendingStatus === 'Pendiente Aprobacion' && this.userProfile === RRHH) {
      status = true;
    }

    return status;
  }

  isPendingHiringRequestGG(pendingStatus: string): boolean {
    let status = false;

    if (
      pendingStatus === 'Pendiente Aprobacion GG' &&
      this.userProfile === GG
    ) {
      status = true;
    }

    return status;
  }

  disableFieldsByStatus(status: string) {
    if (
      status === 'Aprobado' ||
      status === 'Rechazado' ||
      status === 'Pendiente Aprobacion GG'
    ) {
      this.disabledFields();
      this.formApproveHiringRequest.controls['inputReasonReject'].enable();
    }
  }

  goToLink(url: string | null) {
    window.open(base + '/' + url, '_blank');
  }

  setDefaultDisableRRHH() {
    // if (this.userProfile !== GG) {
    //   this.formApproveHiringRequest.controls['inputReasonReject'].disable();
    // }

    if (this.userProfile === GG) {
      this.disabledFields();
      this.formApproveHiringRequest.controls['inputReasonReject'].enable();
    }
  }
}
