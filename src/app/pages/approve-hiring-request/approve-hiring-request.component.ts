import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISalaryBandReponse } from 'src/app/core/models/salaryBand.model';
import { CboxService } from 'src/app/core/services/cbox.service';
import { ContractImboxService } from 'src/app/core/services/contract-imbox.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { getToken } from 'src/app/core/utils/token.storage';
import * as util from '../../core/utils/utilities.util';
import Swal from 'sweetalert2';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contractImboxService: ContractImboxService,
    private activatedRoute: ActivatedRoute,
    private cboxService: CboxService,
    private notification: NotificationService
  ) {
    this.formApproveHiringRequest = this.formBuilder.group({
      inputIdHiringRequest: [{ value: null, disabled: true }],
      cBoxDocumentType: [{ value: null, disabled: true }],
      inputDocumentNumber: [{ value: null, disabled: true }],
      inputNameColl: [{ value: null, disabled: true }],
      inputLastname: [{ value: null, disabled: true }],
      inputLastnameMt: [{ value: null, disabled: true }],
      inputBithDate: [{ value: null, disabled: true }],
      inputPhone: [{ value: null, disabled: true }],
      inputEmail: [{ value: null, disabled: true }],
      inputAddress: [{ value: null, disabled: true }],
      inputDistrict: [{ value: null, disabled: true }],
      inputProvince: [{ value: null, disabled: true }],
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
    });
  }
  ngOnInit(): void {
    this.getHiringRequestDetail();
  }
  // TODO: update status message
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
        this.approveRequest(idHiringRequest);
      }
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

  // TODO: update status message

  onReject(idHiringRequest: string | number): void {
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
    this.contractImboxService.rejectHiringRequest(idHiringRequest).subscribe({
      next: (status) => {
        this.notification.toast('info', 'Solicitud Rechazada', 'SUCCESS', 5000);
        this.backPage();
      },
      error: (err: HttpErrorResponse) => {
        this.notification.toast('error', err.error.message, 'ERROR', 5000);
      },
    });
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

        let plan_eps = hiringRequestSelected.plan_eps
          ? hiringRequestSelected.plan_eps
          : nulo;

        let condicional_adicional = hiringRequestSelected.condicional_adicional
          ? hiringRequestSelected.condicional_adicional
          : nulo;

        let eps_parcial_total = hiringRequestSelected.eps_parcial_total
          ? hiringRequestSelected.eps_parcial_total
          : nulo;
        let ind_sctr = hiringRequestSelected.ind_sctr == 'N' ? false : true;

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
          'YY-MM-DD'
        );

        let fecha_inicio = util.timestampFormat(
          hiringRequestSelected.fecha_inicio,
          'YY-MM-DD'
        );

        let fecha_nacimiento = util.timestampFormat(
          hiringRequestSelected.fecha_nacimiento,
          'YY-MM-DD'
        );

        let ind_asign_familiar: boolean =
          hiringRequestSelected.ind_asign_familiar == 'S' ? true : false;

        this.formApproveHiringRequest.patchValue({
          cBoxBearCost: eps_parcial_total.toUpperCase(), //
          cBoxBusinessLine: hiringRequestSelected.cod_linea_negocio,
          cBoxClient: hiringRequestSelected.nombre_corto!.toUpperCase(),
          cBoxDocumentType: hiringRequestSelected.tipo_documento,
          cBoxEPS: plan_eps.toUpperCase(),
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
          rbSCTR: ind_sctr,
          cboxAsig: ind_asign_familiar,
        });

        this.statusHiringRequest = hiringRequestSelected.estado!;
      });
  }

  get idHiringRequest() {
    return this.formApproveHiringRequest.controls['inputIdHiringRequest'].value;
  }

  private backPage() {
    this.router.navigate(['contract-imbox']);
  }

  isPendingHiringRequest(pendingStatus: string): boolean {
    let status = false;

    const { userProfile } = JSON.parse(getToken());

    if (
      pendingStatus === 'Pendiente Aprobacion' ||
      pendingStatus === 'Pendiente Aprobacion GG'
    ) {
      status = true;
    }

    // RRHH

    if (pendingStatus === 'Pendiente Aprobacion GG' && userProfile === 'RRHH') {
      status = false;
    }

    return status;
  }
}
