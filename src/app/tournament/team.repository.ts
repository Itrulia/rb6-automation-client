import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class TeamRepository {
  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {}

  public getTeams(teamIds: number[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.config.baseUrl}/team/${teamIds.join(",")}`);
  }
}
