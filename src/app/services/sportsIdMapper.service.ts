// sports.service.ts
import { Injectable } from '@angular/core';
import {sportsIdMap} from "./sportsEnum";

@Injectable({
  providedIn: 'root'
})
export class SportsIdMapperService {

  private sports = sportsIdMap
  private dynamicIds: any[] = []

  insertDynamicId(obj: any) {
    this.dynamicIds.push(obj)
  }

  getDynamicId(name: string) {
    let id;
    this.dynamicIds.forEach((object: any) => {
      if (object.url == name) {
        id = object.id
      }
    })
    return id
  }

  getSportByName(name: string): string {
    let sport = this.sports.find(sport => sport.name === name);
    return sport ? sport.id.toFixed(0) : ''
  }

  getSportById(id: number) {
    let sport = this.sports.find(sport => sport.id === id);
    return sport ? sport.name : ''
  }

  getDynamicSports() {
    return this.dynamicIds
  }

  getAllSports() {
    return this.sports;
  }
}
