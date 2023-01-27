import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';
import { ToastrMessageService } from 'src/app/shared/services/toastr_message.service';
import { City, Country, State, UserType } from '../../shared/model/location.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public isSubmited: boolean;
  public msg: string;
  public imageFile!: File
  public base64String: any;
  public isImagevalue: boolean;
  public type: string;
  public passShowHideIcon: string;
  public dNone: string;
  public note: string;
  public countries: Country[] = [];
  public states: State[] = [];
  public cities: City[] = [];
  public userType: UserType[] = [];
  public citiesData: any
  constructor(
    private formBuilder: FormBuilder,
    private registrationServices: RegistrationService,
    private route: Router,
    private toaster: ToastrMessageService
  ) {
    this.base64String = ''
    this.dNone = 'none';
    this.note = ''
    /**
     * @author Ravi Singh
     * creating form group for registration page
     */
    this.registrationForm = this.formBuilder.group({
      image: [''],
      firstName: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9]([A-Za-z0-9\_\.]*)+@(([A-Za-z0-9-]{2,})+\.)+[A-Za-z\-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$%*?&/\\\[\],'`~(\)^=+{\}?|;"\-:#_])[A-Za-z\d@$%*?&/\\\[\],'`~(\)^=+{\}?|;"\-:#_]{0,}$/), Validators.minLength(8), Validators.maxLength(30)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]],
      countryId: ['1',],
      stateId: ['', [Validators.required]],
      cityId: ['', [Validators.required,]],
      userTypeId: ['', [Validators.required,]],
    })
    this.isSubmited = false;
    this.msg = '';
    this.isImagevalue = false;
    this.type = 'password';
    this.passShowHideIcon = 'eye-fill'

  }
  ngOnInit(): void {
    // call get api country
    this.getCountryList();
    // call get api city
    this.getCityList();
    // call get api state
    this.getStateList();
    // call get api userType
    this.getUserType();

  }
  // geter function
  get validator(): { [key: string]: AbstractControl<any> } {
    return this.registrationForm.controls;
  }
  passwordToggle() {
    if (this.type == 'password') {
      this.type = 'text';
      this.passShowHideIcon = 'eye-slash-fill'
    } else {
      this.type = 'password';
      this.passShowHideIcon = 'eye-fill'
    }
  }

  public onSignUp(): void {
    this.isSubmited = true;
    if (this.registrationForm.valid) {
      this.registrationForm.controls['image'].patchValue(this.base64String)
      this.registrationServices.postRegistrationForm(this.registrationForm.value).subscribe((res: any) => {
        console.log(res.message);
        this.route.navigateByUrl('/login')
        this.base64String = ''
        this.registrationForm.reset()
        this.isSubmited = false;
        this.toaster.onSuccess(res.message)
      })

    }
  }
  /**
   *   image upload  and validation
   * @author amresh prasad
   * @param event
   * @returns
   */
  selectFile(event: any) {
    // image message validation
    let imageType = event.target.files[0]
    if (!imageType.name.match('\.(jpg|jpeg|png|heif)$')) {
      this.msg = " “Please upload a valid file format”(Supported file  formats: .jpg, .png, .jpeg, .heif).";
      this.base64String = ''
      return;
    }
    // validation
    let imageSize = event.target.files[0].size;
    if (imageSize >= 5000000) {
      this.msg = " “The maximum size of an image must be less than 5 MB”.";
      this.base64String = ''
      return;
    }
    //  *image priview and convert base64
    this.imageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onload = () => {
      // convert base64
      this.base64String = reader.result
      this.msg = "";
    }
  }
  /**
   *
   * Showing Note Depending on userType
   * @author amresh prasad
   * @param Select
   */
  public selectedUserType(Select: any) {
    if (Select == 1) {
      this.note = ' Please enter your studio information in the "Manage Studio" section from your profile.'
      this.dNone = '';

    } else if (Select == 2) {
      this.note = ' Please enter your artist information in the “Manage artist Profile” section from your profile'
      this.dNone = '';
    }
    else if (Select == 3) {
      this.note = '';
      this.dNone = 'none';
    }
  }

  /**
   * get userType
   */
  getUserType() {
    this.registrationServices.getUserType().subscribe(res => {
      this.userType = res
    })

  }
  /***
   * Get countries
   */
  public getCountryList(): void {

    this.registrationServices.getCountries().subscribe((res: Country[]) => {
      this.countries = res

    })
  }
  /***
   * Get states
   */
  public getStateList(): void {

    this.registrationServices.getStates().subscribe((res: State[]) => {
      this.states = res;
    })
  }
  /***
    * Get cities
    */
  public getCityList(): void {
    this.registrationServices.getCity().subscribe((res: City[]) => {
      this.cities = res;
    })

  }
  /**
   * filter city Depending on state
   * @param stateId
   */
  onChangeState(stateId: any): void {
    if (stateId) {
      this.citiesData = this.cities.filter((cityId) => stateId == cityId.stateId);
      this.registrationForm.controls['cityId'].reset()
    }
  }
}
