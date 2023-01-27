export class Artist {
  // public userDetailId!: number
  public artistName: string;
  public artistDescription: string;
  public toDay: number;
  public fromDay: number;
  public eventRate: number;
  public artistTypeDetail?: artistTypeId[];
  public aristImage?: artistImage[];
  constructor(
    // userDetailId: number,
    artistName: string,
    artistDescription: string,
    toDay: number,
    fromDay: number,
    eventRate: number
  ) {
    // this.userDetailId = userDetailId;
    this.artistName = artistName;
    this.artistDescription = artistDescription;
    this.toDay = toDay;
    this.fromDay = fromDay;
    this.eventRate = eventRate;
  }
}
export class artistTypeId {
  public artistTypeId: number
  constructor(artistTypeId: number) {
    this.artistTypeId = artistTypeId
  }
}
export class artistImage {
  public artistImage: string;
  constructor(artistImage: string) {
    this.artistImage = artistImage
  }
}
