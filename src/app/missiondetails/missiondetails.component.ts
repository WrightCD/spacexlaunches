import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Mission } from '../models/mission';
import { Rocket } from '../models/rocket';
import { Launchpad } from '../models/launchpad';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnChanges {
  @Input() selectedMission!: Mission;
  selectedRocket!: Rocket;
  selectedLaunchPad!: Launchpad;

  constructor(private spacexapiService: SpacexapiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMission'] && this.selectedMission) {
      this.getRocket();
      this.getLaunchPad();
    }
  }

  getRocket(): void {
    this.spacexapiService.getRocketInfo(this.selectedMission.rocket).subscribe(
      (rocket: Rocket) => {
        this.selectedRocket = rocket;
      },
      (error) => {
        console.error('Error fetching rocket info:', error);
      }
    );
  }

  getLaunchPad(): void {
    this.spacexapiService.getLaunchPadInfo(this.selectedMission.launchpad).subscribe(
      (launchpad: Launchpad) => {
        this.selectedLaunchPad = launchpad;
      },
      (error) => {
        console.error('Error fetching launchpad info:', error);
      }
    );
  }
}
