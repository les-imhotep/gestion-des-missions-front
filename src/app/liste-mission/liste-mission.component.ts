import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { Mission } from '../../model';



@Component({
  selector: 'app-liste-mission',
  templateUrl: './liste-mission.component.html',
  styleUrls: ['./liste-mission.component.css'],
  providers: [MissionService]

})
export class ListeMissionComponent implements OnInit {
  missions: Mission[];
  constructor(private _missServ: MissionService) { }

  ngOnInit() {
    this._missServ.listerMission().subscribe(tabMission => (this.missions = tabMission))

  }

}

