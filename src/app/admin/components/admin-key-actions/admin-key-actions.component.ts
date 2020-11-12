import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

import {
  CreateCustomNotificationModalComponent,
} from '../create-custom-notification-modal/create-custom-notification-modal.component';

@Component({
  selector: 'app-admin-key-actions',
  templateUrl: './admin-key-actions.component.html',
  styleUrls: ['./admin-key-actions.component.scss']
})
export class AdminKeyActionsComponent implements OnInit {
  constructor(
    private readonly _modalService: ModalService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  public async openNotificationModal(): Promise<void> {
    await this._modalService.open(CreateCustomNotificationModalComponent, {
      data: {}
    });
  }

  public sendNewsletter(): void {
    this._router.navigateByUrl('admin/create-newsletter');
  }
}
