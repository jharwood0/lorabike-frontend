import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  defaultLat : number = 52.56192;
  defaultLng : number = -1.464854;
  defaultZoom : number = 6;
  lat: number = this.defaultLat;
  lng: number = this.defaultLng;
  zoom: number = this.defaultZoom;
  devices : any[];

  constructor(private deviceService : DeviceService) { }

  ngOnInit() {
    this.deviceService.devices.subscribe(
      devices => {
        this.devices = devices;
      }
    );
  }

}
