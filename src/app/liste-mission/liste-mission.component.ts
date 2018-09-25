import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-liste-mission',
  templateUrl: './liste-mission.component.html',
  styleUrls: ['./liste-mission.component.css']
})
export class ListeMissionComponent implements OnInit {

  constructor(private _missServ: MissionService, private _auth: AuthService) { }

  ngOnInit() {

    this._missServ.listerMission()._subscribe


  }

}
this._collegueSrv.listerCollegues().subscribe(tabCollegue => (this.collegues = tabCollegue))
