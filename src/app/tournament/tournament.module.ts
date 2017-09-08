import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {TournamentComponent} from "./tournament.component";
import {TournamentRepository} from "./tournament.repository";
import {FormsModule} from "@angular/forms";
import {TeamRepository} from "./team.repository";

@NgModule({
  declarations: [
    TournamentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: TournamentComponent
      }
    ]),
  ],
  providers: [
    TournamentRepository,
    TeamRepository
  ],
  exports: [],
})
export class TournamentModule {}
