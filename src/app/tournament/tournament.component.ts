import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {TournamentRepository, Templates} from "./tournament.repository";
import "rxjs/add/operator/map";
import "rxjs/add/operator/first";
import {combineLatest} from "rxjs/observable/combineLatest";
import {TeamRepository} from "./team.repository";
import {replace} from "ramda";

@Component({
  selector: "app-tournament",
  templateUrl: "./tournament.component.html",
  styles: [`
    .o-container {margin-top: 1.5em}
  `]
})
export class TournamentComponent implements OnInit {
  private templates$: Observable<Templates>;

  public tournamentId: number;
  public nextDate: string;
  public raffle1: number;
  public raffle2: number;
  public raffle3: number;
  public raffle4: number;
  public nextNumber: string;
  public build$: Observable<Templates>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repo: TournamentRepository,
    private teamRepo: TeamRepository
  ) {}

  public ngOnInit() {
    this.templates$ = this.repo.getNewsTemplates();
  }

  private getLogo(contestant) {
    return contestant.logo ? contestant.logo : contestant.photo;
  }

  private getName(contestant) {
    return contestant.name ? contestant.name : contestant.nickname;
  }

  private compileTemplate(template: string, first, second, third, teams, tournament): string {
    template = replace(/\{1st-id\}/g, first.id, template);
    template = replace(/\{2nd-id\}/g, second.id, template);
    template = replace(/\{3rd-id\}/g, third.id, template);

    template = replace(/\{1st-name\}/g, this.getName(first), template);
    template = replace(/\{2nd-name\}/g, this.getName(second), template);
    template = replace(/\{3rd-name\}/g, this.getName(third), template);

    template = replace(/\{1st-logo\}/g, this.getLogo(first), template);
    template = replace(/\{2nd-logo\}/g, this.getLogo(second), template);
    template = replace(/\{3rd-logo\}/g, this.getLogo(third), template);

    teams.forEach((team, index) => {
      template = replace(new RegExp(`{raffle${index + 1}-id}`, "g"), team.id, template);
      template = replace(new RegExp(`{raffle${index + 1}-name}`, "g"), this.getName(team), template);
      template = replace(new RegExp(`{raffle${index + 1}-logo}`, "g"), this.getLogo(team), template);
    });

    template = replace(/\{tournament-title\}/g, tournament.name.full, template);
    template = replace(/\{tournament-url\}/g, tournament.uri, template);

    template = replace(/\{next-tournament-number\}/g, this.nextNumber, template);
    template = replace(/\{next-tournament-date\}/g, this.nextDate, template);

    return template;
  }

  public build(
    tournamentId: number,
    raffle1: number,
    raffle2: number,
    raffle3: number,
    raffle4: number
  ): Observable<Templates> {
    const tournament$ = this.repo.getTournament(tournamentId).first();
    const podium$ = this.repo.getPodium(tournamentId).first();
    const teams$ = this.teamRepo.getTeams([raffle1, raffle2, raffle3, raffle4]).first();

    return combineLatest(
      this.templates$,
      tournament$,
      podium$,
      teams$
    ).map(([template, tournament, podium, teams]) => {
      const first = podium[0];
      const second = podium[1];
      const third = podium[2];

      const teaser = this.compileTemplate(template.teaser, first, second, third, teams, tournament);
      const short = this.compileTemplate(template.short, first, second, third, teams, tournament);
      const body = this.compileTemplate(template.body, first, second, third, teams, tournament);
      const title = this.compileTemplate(template.title, first, second, third, teams, tournament);
      const twitter = this.compileTemplate(template.twitter, first, second, third, teams, tournament);

      return {teaser, short, body, title, twitter};
    });
  }
}
