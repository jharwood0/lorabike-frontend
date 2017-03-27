export class User {
  constructor(inUser){
    this.username = inUser.username;
    this.email = inUser.email;
    this.devices = inUser.devices;
  }
  username : string;
  email : string;
  devices : string[];
}
