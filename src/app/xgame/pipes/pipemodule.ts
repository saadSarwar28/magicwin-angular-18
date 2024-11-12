import { NgModule } from "@angular/core";
import { DaysFormatPipePipe } from "./days-format.pipe";
import { FilterBets } from "./filterbets.pipe";
import { OrderbyrunnerPipe } from "./orderbyrunner.pipe";
import { ShortennumPipe } from './shortennum.pipe';
import { SortByDatePipe } from "./sortByDate.pipe";
import { PremiumRacePipe } from "./premium-race.pipe";
import { RoundoffPipe } from "./roundoff.pipe";
import { DateSortPipe } from "./date-sort.pipe";

@NgModule({
  imports: [],

    declarations: [ OrderbyrunnerPipe, ShortennumPipe, DaysFormatPipePipe,SortByDatePipe,PremiumRacePipe,RoundoffPipe,DateSortPipe],
  exports: [ OrderbyrunnerPipe, ShortennumPipe, DaysFormatPipePipe,SortByDatePipe,PremiumRacePipe,RoundoffPipe,DateSortPipe]
})
export class PipesModule { }
