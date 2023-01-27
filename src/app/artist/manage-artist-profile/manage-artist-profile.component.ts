import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flatMap, reduce } from 'rxjs';
import { ManageArtistProfileService } from './manage-artist-profile.service';
import { Artist, artistImage } from '../model/artist.model';
import { ArtistType } from '../model/artistTypes.model';
import { PerformanceType } from '../model/performanceTypes.model';
import { ConfirmationDialogueComponent } from 'src/app/shared/confirmation-dialogue/confirmation-dialogue.component';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { ToastrMessageService } from 'src/app/shared/services/toastr_message.service';


@Component({
  selector: 'app-manage-artist-profile',
  templateUrl: './manage-artist-profile.component.html',
  styleUrls: ['./manage-artist-profile.component.scss']
})
export class ManageArtistProfileComponent implements OnInit {
  public artistProfileForm!: FormGroup;
  public artisttypeList: ArtistType[] = [];
  public performanceTypeList: PerformanceType[] = [];
  public isSubmitted: boolean;
  public weekdays1Id: number;
  public days: any[];
  public images: any[] = [];
  public total_images: any;
  public files: any;
  public selectedImage: any;
  public data: boolean = false;
  public removeIndex: any;
  public msg: string;
  public imageFile!: File
  public base64String: any;
  public isImagevalue: boolean;
  public artistType: any[] = []
  constructor(private formBuilder: FormBuilder,
    private overlayService: OverlayService,
    private manageArtistServices: ManageArtistProfileService, private toasterService: ToastrMessageService) {
    this.artistProfileForm = this.formBuilder.group(
      {
        artistName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[A-Za-z0-9 _@$!&]*$')]],
        artistTypeId: ['', [Validators.required]],
        artistDescription: ['', [Validators.required, Validators.maxLength(250)]],
        performanceTypeId: ['', [Validators.required]],
        toDay: ['', [Validators.required]],
        fromDay: ['', [Validators.required]],
        eventRate: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        artistImage: this.formBuilder.array([]),
        // artistTypeDetail: this.formBuilder.array([])
      }
    )
    this.msg = '';
    this.isImagevalue = false;
    this.isSubmitted = false;
    this.weekdays1Id = 0;
    this.days = [
      { id: 1, day: 'Monday' },
      { id: 2, day: 'Tuesday' },
      { id: 3, day: 'Wednesday' },
      { id: 4, day: 'Thursday' },
      { id: 5, day: 'Friday' },
      { id: 6, day: 'Saturday' },
      { id: 7, day: 'Sunday' },
    ]
  }
  ngOnInit(): void {
    // getartistType function call
    this.getartistType();
    // getperformanceType function call
    this.getperformanceType();
    // ovelay
    this.overlayService.delectImage$.subscribe((res: any) => {
      this.data = res
      if (res) {
        this.images.splice(this.removeIndex, 1);
      }
      else if (this.data === false) {
        this.images = this.images
      }
    })
    this.overlayService.noImage$.subscribe((res: any) => {
      if (this.data === false) {
        this.images = this.images
      }

    })
  }

  /**
   * image upload  and validation
   * @param event
   */

  onSelect(event: any) {
    let imageCount = 0;
    imageCount = event.addedFiles.length;
    imageCount += this.images.length;

    if (imageCount > 5) {
      this.toasterService.onError("You Can Only Select Upto 5 Images !");
      imageCount = 0;
    }
    else {
      this.uploadImageValidation(event);
      event.addedFiles.forEach(async (element: any) => {
        let imageSize = element.size;
        if (imageSize >= 5000000) {
          this.toasterService.onError(" “The maximum size of an image must be less than 5 MB”.");
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(element);
          reader.onload = () => this.images.push({ isLike: false, artistImage: reader.result });

        }
      });
    }
  }
  /**
   * Submit Details
   */
  public submitDetails() {
    this.images.find(v => v.isLike = true);
    const images = this.artistProfileForm.controls['artistImage'] as FormArray;
    images.push(this.formBuilder.group(this.images));
    this.isSubmitted = true;
    if (this.artistProfileForm.valid) {
      this.manageArtistServices.postRegistrationForm(this.artistProfileForm.value).subscribe((res: Artist) => {
        console.log(res);
        this.images = [];
        this.artistProfileForm.reset();
        this.isSubmitted = false;
      })
    }
  }
  /**
     * Validation FormControl
     */
  get validator(): { [key: string]: AbstractControl<any> } {
    return this.artistProfileForm.controls;
  }
  /***
   * get all artistType
   */
  public getartistType(): void {
    this.manageArtistServices.getartistType().subscribe((res: ArtistType[]) => {
      this.artisttypeList = res;
    })
  }
  /***
 * get all getperformanceType
 */
  public getperformanceType(): void {
    this.manageArtistServices.perfomanceType().subscribe((res: PerformanceType[]) => {
      this.performanceTypeList = res;
    })
  }
  /**
   * onChange or disable
   * @param weekday1Id
   */
  onweekDays1(weekday1Id: number) {
    this.weekdays1Id = weekday1Id;
  }

  /**
  * image upload validation
  * @param event
  */
  uploadImageValidation(event: any) {
    event.rejectedFiles.forEach(async (response: any) => {
      let imageType = response
      if (!imageType.name.match('\.(jpg|jpeg|png|heif)$')) {
        this.toasterService.onError(" “Please upload a valid file format”(Supported file  formats: .jpg, .png, .jpeg, .heif).");
        return;
      }
    })
  }
  /**
   * image delete and validation
   * @param event
   */
  onRemove(event: any) {
    console.log(event);
    this.removeIndex = event;
    this.overlayService.openDialog(ConfirmationDialogueComponent);
  }

  /**
   * fav image
   * @param selectedImage
   */
  setFavImage(selectedImage: any) {
    this.images.find(v => v.isLike = true);
    this.images = this.images.map((item: any, index: number) => {

      if (index === selectedImage) {
        item.isLike = true;
      }
      else {
        item.isLike = false;
      }
      return item;
    });
  }
}

