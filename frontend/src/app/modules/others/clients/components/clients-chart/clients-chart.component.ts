import { Component, AfterViewInit, Input } from '@angular/core';

import { ClientsService } from '../../services/index';

import { Chart } from 'chart.js';

@Component({
	selector: 'app-clients-chart',
	template: "<canvas [id]='chartId'></canvas>",
	styleUrls: ['./clients-chart.component.scss']
})
export class ClientsChartComponent implements AfterViewInit {
	@Input()
	public chartId: string;

	public chart!: Chart;

	private totalNewClients: Array<number>;
	private totalExClients: Array<number>;

	constructor(private clientsService: ClientsService) {
		this.chartId = '';
		this.totalNewClients = new Array<number>(12);
		this.totalExClients = new Array<number>(12);

		for (var i = 0; i < 12; i++) {
			this.totalNewClients[i] = 0;
			this.totalExClients[i] = 0;
		}
	}

	ngAfterViewInit() {
		this.newChart();
	}

	public newChart(): void {
		this.checkRequiredFields();
	}

	private checkRequiredFields(): void {
		if (this.chartId === '') {
			throw new Error("Attribute 'chartId' is required.");
		}

		this.getDates();
	}

	private getDates(): void {
		this.totalNewClients = new Array<number>(12);
		this.totalExClients = new Array<number>(12);

		for (var i = 0; i < 12; i++) {
			this.totalNewClients[i] = 0;
			this.totalExClients[i] = 0;
		}

		this.clientsService.getNewClientsInYear().subscribe(
			(response: Array<any>) => {
				for (var i = 0; i < response.length; i++) {
					var month = new Date(response[i].createdAt).getMonth();

					if (response[i].active == 0) {
						this.totalExClients[month]++;
					} else if (response[i].active == 1) {
						this.totalNewClients[month]++;
					}
				}

				this.redererChart();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private redererChart(): void {
		if (this.chart != null) {
			this.chart.destroy();
		}

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
						label: 'Clientes Nuevos',
						data: this.totalNewClients,
						backgroundColor: 'rgba(0, 123, 255, 0.5)',
						borderColor: 'rgba(0, 123, 155, 1)',
						borderWidth: 2
					},
					{
						label: 'Clientes Eliminados',
						data: this.totalExClients,
						backgroundColor: 'rgba(217, 83, 79, 0.5)',
						borderColor: 'rgba(217, 83, 79, 1)',
						borderWidth: 2
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
