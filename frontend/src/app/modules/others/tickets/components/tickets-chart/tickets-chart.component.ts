import { Component, AfterViewInit, Input } from '@angular/core';

import { TicketsService } from '../../services/index';

import { Chart } from 'chart.js';

@Component({
	selector: 'app-tickets-chart',
	template: "<canvas [id]='chartId'></canvas>",
	styleUrls: ['./tickets-chart.component.scss']
})
export class TicketsChartComponent implements AfterViewInit {
	@Input()
	public chartId: string;

	public chart!: Chart;

	private totalInMonths: Array<number>;
	private homeDeliverysInMonths: Array<number>;

	constructor(private ticketsService: TicketsService) {
		this.chartId = '';
		this.totalInMonths = new Array<number>(12);
		this.homeDeliverysInMonths = new Array<number>(12);

		for (var i = 0; i < 12; i++) {
			this.totalInMonths[i] = 0;
			this.homeDeliverysInMonths[i] = 0;
		}
	}

	ngAfterViewInit(): void {
		this.checkRequiredFields();
	}

	private checkRequiredFields(): void {
		if (this.chartId === '') {
			throw new Error("Attribute 'chartId' is required.");
		}

		this.getDates();
	}

	private getDates(): void {
		this.ticketsService.getTicketsInYear().subscribe(
			(response) => {
				for (var i = 0; i < response.length; i++) {
					//this.totalInMonths[Number(response[i].creationDate)] += response[i].total;

					if (response[i].homeDelivery)
						this.homeDeliverysInMonths[Number(response[i].creationDate)]++;
				}

				this.redererChart();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private redererChart(): void {
		this.chart = new Chart(this.chartId, {
			type: 'line',
			data: {
				labels: [
					'Enero',
					'Febrero',
					'Marzo',
					'Abril',
					'Mayo',
					'Junio',
					'Julio',
					'Agosto',
					'Septiembre',
					'Octubre',
					'Noviembre',
					'Diciembre'
				],
				datasets: [
					{
						label: 'Total De Cada Mes',
						data: this.totalInMonths,
						backgroundColor: 'rgba(0, 123, 255, 0.5)',
						borderColor: 'rgba(0, 123, 155, 1)',
						borderWidth: 2
					},
					{
						label: 'Total de domicilios',
						data: this.homeDeliverysInMonths,
						backgroundColor: 'rgba(12, 092, 323, 0.5)',
						borderColor: 'rgba(12, 092, 323, 1)',
						borderWidth: 2,
						hidden: true
					}
				]
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							}
						}
					]
				}
			}
		});
	}
}
