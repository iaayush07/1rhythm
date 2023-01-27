import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loaderStatus: boolean;
  constructor(private loaderService: LoaderService) {
    this.loaderStatus = false;
  }

  ngOnInit(): void {
    this.loaderService.status$.subscribe((status: boolean) => {
      this.loaderStatus = status
    })
  }

}
