import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  devices : any[]

  constructor(private deviceService : DeviceService) { }

  ngOnInit() {
    this.deviceService.devices.subscribe(
      devices => {
        this.devices = devices;
      }
    );
  }

}
