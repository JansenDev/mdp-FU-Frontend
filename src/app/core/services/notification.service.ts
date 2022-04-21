import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  private notificationsObj: INotificationType = {
    show: (toastOptions: []) => this.toastrService.show(...toastOptions),
    info: (toastOptions: []) => this.toastrService.info(...toastOptions),
    error: (toastOptions: []) => this.toastrService.error(...toastOptions),
    clear: () => this.toastrService.clear(),
    success: (toastOptions: []) => this.toastrService.success(...toastOptions),
    warning: (toastOptions: []) => this.toastrService.warning(...toastOptions),
  };

  toast(
    type: keyof INotificationType = 'error',
    message: string = '',
    title: string = '',
    timeOut: number = 3000
  ) {
    const TOAST_CONFIG: Partial<IndividualConfig> = {
      enableHtml: true,
      timeOut: timeOut,
      progressBar: true,
      progressAnimation: 'increasing',
    };

    const toastOptions: [string, string, Partial<IndividualConfig>] = [
      message,
      title,
      TOAST_CONFIG,
    ];

    return this.notificationsObj[type](toastOptions);
  }
}

interface INotificationType {
  error: Function;
  success: Function;
  show: Function;
  clear: Function;
  info: Function;
  warning: Function;
}
