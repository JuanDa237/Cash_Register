import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '@app/modules/others/ingredients/models';

import { Chart } from "chart.js";

@Component({
  selector: 'app-utility-chart',
  template: "<canvas [id]='chartId'></canvas>",
  styleUrls: ["./utility-chart.component.scss"]
})
export class UtilityChartComponent implements OnInit, AfterViewInit {
  
  @Input()
  public chartId: string;

  public chart!: Chart;

  constructor() {
    this.chartId = '';
  }

  ngOnInit(): void {
    this.checkRequiredFields();
  }

  ngAfterViewInit(): void {
    this.createEmptyChart();
  }

  private checkRequiredFields(): void {
    if(this.chartId === '') {
      throw new Error("Attribute 'chartId' is required.");
    }
  }

  private createEmptyChart(): void {

    this.chart = new Chart(this.chartId, {
          type: 'pie',
          data: {
              labels: ["Utilidad"],
              datasets: [
                {
                  label: 'Porcentaje',
                  data: [1],
                  backgroundColor: "rgba(0, 123, 255, 0.5)"
                }
              ]
          }
      });
  }

  public actualizeUtility(ingredients: Ingredient[], spendingAmount: number[], productPrice: number): void {
    
    var nameOfIngredients: Array<string> = new Array<string>(0);
    var percentOfIngredients: Array<number> = new Array<number>(0);
    
    var priceOfIngredients: number = 0;
    var utility: number = 0;

    for(var i = 0; i < ingredients.length; i++) {

      if(spendingAmount[i] != null && spendingAmount[i] != 0) {
        
        nameOfIngredients.push(ingredients[i].name);

        var aux = ingredients[i].priceByUnit * spendingAmount[i];

        percentOfIngredients.push(aux);
        priceOfIngredients += aux;
      }
    }
    
    utility = productPrice - priceOfIngredients;

    if(utility <= 0) {
      nameOfIngredients.push("Perdida");
    }
    else if(utility > 0) {
      nameOfIngredients.push("Utilidad");
    }

    percentOfIngredients.push(utility);

    if(this.chart != null) {

      this.chart.data.labels = nameOfIngredients;
      
      this.chart.data.datasets?.forEach((dataset) => {
        
        dataset.backgroundColor = function(): string {
          if(utility <= 0) {
            return 'rgba(217, 83, 79, 0.5)';
          }
          else {
            return 'rgba(0, 123, 255, 0.5)';
          }
        }

        dataset.data = percentOfIngredients;
      });

      this.chart.update();
    }
  }
}
