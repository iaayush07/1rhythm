/**
 * @author Ravi Singhs
 */
export class userRegistration {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public phone: Number;
  public countryId: Number;
  public stateId: Number;
  public cityId: Number;
  public userTypeId: Number;
  public image: any;
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: Number,
    countryId: Number,
    stateId: Number,
    cityId: Number,
    userTypeId: Number,
    image: any
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.countryId = countryId;
    this.stateId = stateId;
    this.cityId = cityId;
    this.userTypeId = userTypeId;
    this.image = image
  }

}
