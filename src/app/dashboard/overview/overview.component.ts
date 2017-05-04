import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';

export class Error {
  message: string;
  constructor(message: string) {
        this.message = message;
    }
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
  devices : any[]

  constructor(private deviceService : DeviceService) { }

  isLoading: boolean = false;

  errors: Array<Error> = new Array<Error>();
  name : string;
  devEUI : string;
  description : string;

  ngOnInit() {
    this.deviceService.devices.subscribe(
      devices => {
        this.devices = devices;
        for(let device of this.devices){
          if(device.uplinks.length > 0){
            if(device.uplinks[device.uplinks.length-1].timestamp >= (Date.now() - 10000000)){
              device.active = true;
            }else{
              device.active = false;
            }
          }else{
            device.active = false;
          }
        }
      }
    );
  }

  registerDevice() {
    this.errors = new Array<Error>();
    this.isLoading = true;
    // check if deveui is valid
    var re = /[0-9A-Fa-f]{6}/g;
    if(!re.test(this.devEUI)) {
      this.isLoading = false;
      this.errors.push(new Error("Invalid DevEUI"));
    }else{
      this.deviceService.registerDevice(this.name, this.devEUI, this.description).subscribe((result) => {
        if(result){
          this.isLoading = false;
          // reset form
          this.name = "";
          this.devEUI = "";
          this.description = "";
        }else{
          this.isLoading = false;
          this.errors.push(new Error("unable to contact TheThingsNet"));
        }
      });
    }
  }

}
