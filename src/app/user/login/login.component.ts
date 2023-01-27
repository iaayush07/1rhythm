import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router";
import { AuthService } from 'src/app/core/services/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { ToastrMessageService } from 'src/app/shared/services/toastr_message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  isSubmitted: boolean = false;
  public token: any;

  /**
  * @author Kiran Gandhi
  */
  password: string = 'password';
  public show: boolean = false;
  public showPassword!: boolean;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrMessageService,
    private router: Router) {
    this.loginForm = new FormGroup('');
    this.token = {}
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      /**
       * @author Almira Shaikh
       */
      email: ['', [Validators.required, Validators.pattern(/^(?=.*?[_.]).*([a-z0-9])+@([a-z\-]{2,}\.)+[a-z\-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$%*?&/\\\[\],'`~(\)^=+{\}?|;"\-:#_])[A-Za-z\d@$%*?&/\\\[\],'`~(\)^=+{\}?|;"\-:#_]{0,}$/
      )]],
    });
  }

  /**
 * @author Jinal Tandel
 * @param token
 * @returns decoded token
 */
  DecodeToken(token: string): string {
    return jwt_decode(token)
  }

  /**
   * Function for onSignIn
   * @author Almira Shaikh and Jinal Tandel
   * @description store the data in localstorage in loginForm
   */
  onSignIn() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        this.token = this.DecodeToken(res.result);
        localStorage.setItem('user', res.result);
        localStorage.setItem('expirationTime', this.token.exp);
        localStorage.setItem('RoleType', this.token.role)
        localStorage.setItem('userName', this.token.firstName + ' ' + this.token.lastName)
        localStorage.setItem('userId', this.token.userDetailId)
        this.router.navigateByUrl("/home");
        this.toastrService.onSuccess(res.message);
      })
    }
  }

  /**
   * @author Kiran Gandhi
   * @description password show-hide icon-Logic
   */
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

}
