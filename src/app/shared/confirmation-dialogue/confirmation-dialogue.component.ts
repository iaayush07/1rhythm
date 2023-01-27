import { Component, Input, OnInit } from '@angular/core';
import { OverlayService } from '../services/overlay.service';

@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrls: ['./confirmation-dialogue.component.scss']
})
export class ConfirmationDialogueComponent implements OnInit {
  public imagedata: any
  @Input() name!: string;
  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
  }
  public confirmData(): void {
    this.overlayService.overlayRef.detach()
    this.overlayService.deleteItem(true);
  }

  public cancleData(): void {
    this.overlayService.overlayRef.detach()
    // this.overlayService.delectImage.next(false)
    this.overlayService.noItem(false);
  }

}
