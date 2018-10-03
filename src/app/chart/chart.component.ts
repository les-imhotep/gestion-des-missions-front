import { Component, OnInit, Input } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
import { Mission } from '../../model';

@Component({
  selector: 'app-chart',
  template: `

  <jqxChart
[width]="850" [height]="500"
[title]="'Primes année 2017'" [description]="'Le calcul de vos primes de l'année n-1"
[enableAnimations]="true" [showLegend]="true" [padding]="padding"
[titlePadding]="titlePadding" [source]="primesTab" [xAxis]="xAxis"
[valueAxis]="valueAxis" [seriesGroups]="seriesGroups" [colorScheme]="'scheme01'">
</jqxChart>

`,


  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // Graphique de primes de mission
@Input() primestab:Mission[];

padding: any = { left: 20, top: 5, right: 20, bottom: 5 };
 
titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
 
// Définition de l'axe x
xAxis: any =
{
    dataField: 'this.primestab.name',
    gridLines: { visible: true },
    flip: false
};

// Ce que l'axe x va retourner comme valeurs
valueAxis: any =
{
    flip: true,
    labels: {
            visible: true,
            formatFunction: (value: string) => {
                return value;
        }
    }
};

seriesGroups: any[] =
    [
        {
            type: 'column',
            orientation: 'vertical',
            columnsGapPercent: 50,
            toolTipFormatSettings: { thousandsSeparator: ',' },
            series: [
                { dataField: 'Primes', displayText: 'Primes (€)' }
            ]
        }
    ];



  constructor() { }

  ngOnInit() {
  }

} 