import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = '1Rhythm';

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
