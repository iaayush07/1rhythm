import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { artistData } from '../artist/artist.model';
import { ArtistService } from '../artist/services/artist.service';
import { StudioService } from '../studio/services/studio.service';
import { studio } from '../studio/studio.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public artistRecentSixData: any;
  public studioRecentSixData: any;
  public studioRecentData: any
  public artistRecentData: any;
  public carouselData: any;

  public roleType!: any;

  //------------
  public showArtist: boolean;
  public showStudio: boolean;

  constructor(private studioService: StudioService, private artistService: ArtistService, private router: Router) {

    // this.artistRecentSixData = [];
    this.studioRecentSixData = [];

    //-show artist and studio
    this.showArtist = false
    this.showStudio = false
  }

  ngOnInit(): void {
    this.showStudioAndArtist();
    this.getCarouselData();
    this.getStudioData();
    this.getArtistData();

    //----fake-localstorage
    this.roleType = localStorage.getItem("RoleType")
  }

  /**
   * @author : Ayush Dhimmar
   * show and hide studio and artist functionality according to roleType
   */
  showStudioAndArtist() {
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
  /**
   * @author : Ayush Dhimmar
 * get recently added six data of artist
 */
  getArtistData() {
    this.artistService.getArtistData().subscribe((response: artistData[]) => {

      this.artistRecentSixData = response
        .map(item => {
          return {
            id: item.artistId,
            name: item.artistName,
            description: item.artistType,
            image: item.artistImage,
            typeId: 2
          }
        }).slice(0, 6);
    })
  }

  /**
  /** 
   * @author : Charvi Sarang
   * Get recently added six data of studio 
   */
  getStudioData() {
    this.studioService.getStudioData().subscribe((result: studio[]) => {
      this.studioRecentSixData = result.map(item => {
        return {
          id: item.studioId,
          name: item.studioName,
          description: item.studioAddress,
          image: item.studioImage,
          typeId: 1
        }
      }).slice(0, 6);
    });
  }
  /**
   * to show data in carousel according to the usertype
   * @author : Nikunj Patel
   */
  getCarouselData() {
    //---- Get recently added data of studio -----//
    this.studioService.getStudioData().subscribe((res: studio[]) => {

      this.studioRecentData = res.map(item => {
        return {
          image: item.studioImage,
          description: item.studioAddress,
          name: item.studioName,
          role: "STUDIO",
          typeId: 1
        }
      });


      //---- Get recently added data of artist -----//
      this.artistService.getArtistData().subscribe((res: artistData[]) => {
        this.artistRecentData = res.map(item => {
          return {
            image: item.artistImage,
            description: item.artistType,
            name: item.artistName,
            role: "ARTIST",
            typeId: 2
          }
        });

        /**
         *   toshow the data according the different type of user
         */
        if (this.roleType == "Studio Owner") {
          this.carouselData = this.artistRecentData.slice(0, 4)
        }
        else if (this.roleType == "Artist") {
          this.carouselData = this.studioRecentData.slice(0, 4)
        }
        else if (this.roleType == "General User") {
          this.carouselData = ((this.studioRecentData.slice(0, 2)).concat(this.artistRecentData.slice(0, 2)))
        }
      })
    })
  }

  /** 
     * @author : Charvi Sarang
     * Get recently added six data of studio 
     */
  // Navigating the Studio-List Page
  onStudioList() {
    this.router.navigate(["studio/studio-list"]);
  }
  // Navigating the Artist-List Page
  onArtistList() {
    this.router.navigate(["artist/artist-list"]);
  }
}


