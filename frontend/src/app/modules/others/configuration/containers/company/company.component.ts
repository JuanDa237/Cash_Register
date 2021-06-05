import { Component, OnInit } from '@angular/core';

import { Company, createEmptyCompany } from '../../../companies/models';

//Api
import { environment } from '@enviroment/environment';
import { UserDataService } from '@app/modules/main/navigation/services';

@Component({
	selector: 'app-config-company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
	public company: Company;
	public apiUrl: string;

	constructor(private userData: UserDataService) {
		this.company = createEmptyCompany();
		this.apiUrl = environment.apiUrl;
	}

	ngOnInit(): void {
		this.company = this.userData.getCompany();
		this.userData.company$.subscribe((x) => (this.company = x));
	}
}
