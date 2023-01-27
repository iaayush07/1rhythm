// country model
export class Country {
  public countryId: number;
  public countryName: string;
  constructor(
    countryId: number,
    countryName: string
  ) {
    this.countryId = countryId;
    this.countryName = countryName
  }
}

// state model
export class State {
  public countryId: number;
  public stateId: number;
  public stateName: string;
  constructor(
    countryId: number,
    stateId: number,
    stateName: string
  ) {
    this.countryId = countryId;
    this.stateId = stateId;
    this.stateName = stateName;

  }
}
// city model
export class City {
  public cityId: number;
  public stateId: number;
  public cityName: string;
  constructor(
    cityId: number,
    stateId: number,
    cityName: string,
  ) {
    this.cityId = cityId;
    this.stateId = stateId;
    this.cityName = cityName
  }
}

// usertype model
export class UserType {
  public userTypeId: number;
  public userType: string;
  constructor(
    userTypeId: number,
    userType: string,
  ) {
    this.userTypeId = userTypeId;
    this.userType = userType

  }

}

