import { Component, OnInit } from '@angular/core';
import { Prime } from '../../model';
import { PrimeService } from '../../services/prime.service';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss']
})
export class PrimesComponent implements OnInit {

 // Message d'erreur
 err: string;

  // Liste des primes
  primesTab:Prime[];
  prime:Prime;


  constructor(private _primessrv:PrimeService) { }

  ngOnInit() {
  }

}
