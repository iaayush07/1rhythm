import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrMessageService {

  constructor(
    private toaster: ToastrService
  ) { }
  /**
   * @author Samkeet Kevat
   * @description toaster for Displaying messages
   * @param message
   * @returns success and warning messages
   */
  onSuccess(message: string) {
    return this.toaster.success(message);
  }
  onError(message: string) {
    return this.toaster.error(message);
  }
}
