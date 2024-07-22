import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {
  private apiUrl = 'https://api.spacexdata.com/v4/launches/query';
  private rocketsUrl = 'https://api.spacexdata.com/v4/rockets/';
  private launchpadsUrl = 'https://api.spacexdata.com/v4/launchpads/';

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getLaunches(): Observable<any> {
    const body = {
      query: {},
      options: {
        limit: 100
      }
    };
    return this.http.post(this.apiUrl, body, { headers: this.createHeaders() })
      .pipe(
        map((response: any) => response.docs)
      );
  }

  public getLaunchesByYear(year: string): Observable<any> {
    const body = {
      query: {
        date_utc: {
          $regex: `^${year}`
        }
      },
      options: {
        limit: 100
      }
    };
    return this.http.post(this.apiUrl, body, { headers: this.createHeaders() })
      .pipe(
        map((response: any) => response.docs)
      );
  }

  public getLaunchesBySuccess(success: boolean): Observable<any> {
    const body = {
      query: {
        success: success
      },
      options: {
        limit: 100
      }
    };
    return this.http.post(this.apiUrl, body, { headers: this.createHeaders() })
    .pipe(
      map((response: any) => response.docs)
    );
  }

  public getRocketInfo(rocket: string): Observable<any> {
    return this.http.get(`${this.rocketsUrl}${rocket}`);
  }

  public getLaunchPadInfo(launchpad: string): Observable<any> {
    return this.http.get(`${this.launchpadsUrl}${launchpad}`);
  }
}
