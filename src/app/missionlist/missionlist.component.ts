import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../network/spacexapi.service';
import {Mission} from '../models/mission';
import { response } from 'express';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  years: string[] = [];
  mission_info: Mission[] = [];
  selectedMission: Mission | null = null;

  toggleMissionDetails(mission: Mission): void {
    this.selectedMission = this.selectedMission === mission ? null : mission;
  }


  constructor(private spacexapiservice: SpacexapiService) {}

  ngOnInit(): void {
    this.generateYears();
    this.getLaunches();
  }

  generateYears(): void {
    const startYear = 2006;
    const currentYear = new Date().getFullYear();
    this.years = [];

    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }

  getLaunches(): void {
    this.spacexapiservice.getLaunches().subscribe(
      (response: Mission[]) => {
        this.mission_info = response
      },
      error => {
        console.log(error);
      }
    );
  }

  extractYearFromDate(dateString: string): string {
    return dateString.substring(0, 4); 
  }

  

  filterLaunchesByYear(year: string): void {
    this.spacexapiservice.getLaunchesByYear(year).subscribe(
      (response: Mission[]) => {
        console.log(response);
        this.mission_info = response
      },
      error => {
        console.log(error);
      }
    );
  }

  filterLaunchesBySuccess(launched: boolean): void{
    this.spacexapiservice.getLaunchesBySuccess(launched).subscribe(
      (response: Mission[]) => {
        console.log(response);
        this.mission_info = response
      },
      error => {
        console.log(error)
      }
    )
  }
}
