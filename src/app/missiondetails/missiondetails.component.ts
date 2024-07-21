import { Component, Input } from '@angular/core';
import {Mission} from '../models/mission'

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css'
})
export class MissiondetailsComponent {
  @Input()
  selectedMission!: Mission;
}
