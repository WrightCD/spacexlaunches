import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  constructor(private http: HttpClient) { }

  public getLaunches(): Observable<any>{
    return this.http.get(`https://api.spacexdata.com/v3/launches?limit=100`);
  }

  public getLaunchesByYear(year: string): Observable<any>{
    return this.http.get(`https://api.spacexdata.com/v3/launches?launch_year=${year}`);
  }
  
  public getLaunchesBySuccess(launched: boolean): Observable<any>{
    return this.http.get(`https://api.spacexdata.com/v3/launches?launch_success=${launched}`);
  }
}
