import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userDataId: any;
  public userData: any;
  public roleType: any;
  public showArtist: boolean;
  public showStudio: boolean;
  public getValue: any
  public firstName: any
  public lastName: any
  public userName: any




  constructor(private userService: UserService, private router: ActivatedRoute, private authService: AuthService) {
    this.showArtist = false;
    this.showStudio = false;
  }

  ngOnInit(): void {
    this.roleType = localStorage.getItem("RoleType");
    this.showArtistAndStudio();

    /**
     * @author : Nikunj Patel
     */
    this.userDataId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.getProfileData();
  }



  /**
   * to Get the profile picture of the particular user
   * @author : Nikunj Patel
   */

  getProfileData() {
    this.userService.getDataById(this.userDataId).subscribe(res => {
      this.userData = res
    })
  }

  /**
  /**
 * @author : Ayush Dhimmar
   * show and hide studio and artist functionality according to roleType
   * */
  showArtistAndStudio() {
    if (this.roleType == "Studio Owner") {
      this.showArtist = true;
    }

    else if (this.roleType == "Artist") {
      this.showStudio = true;
    }

    else if (this.roleType == "General User") {
      this.showArtist = true;
      this.showStudio = true
    }
  }

  onLogout() {
    this.authService.logout();
  }

}
