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
  years = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  mission_info: Mission[] = [];
  selectedMission: Mission | null = null;

  toggleMissionDetails(mission: Mission): void {
    this.selectedMission = this.selectedMission === mission ? null : mission;
  }


  constructor(private spacexapiservice: SpacexapiService) {}

  ngOnInit(): void {
    this.getLaunches();
  }

  getLaunches(): void {
    this.spacexapiservice.getLaunches().subscribe(
      (response: Mission[]) => {
        console.log(response);
        this.mission_info = response
      },
      error => {
        console.log(error);
      }
    );
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
