import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number = 40.730610;
  lng: number = -73.935242;
  devices : any[];

  constructor(private deviceService : DeviceService) { }

  ngOnInit() {
    this.deviceService.devices.subscribe(
      devices => {
        this.devices = devices;
        console.log(devices);
      }
    );
  }

}
