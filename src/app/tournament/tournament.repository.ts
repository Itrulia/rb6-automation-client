import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../app.config";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";

export interface Templates {
  title: string;
  teaser: string;
  short: string;
  body: string;
  twitter: string;
}

@Injectable()
export class TournamentRepository {
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private config: AppConfig
  ) {}

  public getNewsTemplates(): Observable<Templates> {
    return this.db.object("/templates");
  }

  public getPodium(tournamentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.config.baseUrl}/tournament/${tournamentId}/podium`);
  }

  public getTournament(tournamentId: number): Observable<any> {
    return this.http.get<any[]>(`${this.config.baseUrl}/tournament/${tournamentId}`);
  }
}
