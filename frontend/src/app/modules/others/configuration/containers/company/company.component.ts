import { Component, OnInit } from '@angular/core';
import { Company, createEmptyCompany } from '../../../companies/models';
import { CompanyService } from '../../../companies/services';

//Api
import { environment } from '@enviroment/environment';
import { UserDataService } from '@app/modules/main/navigation/services';

@Component({
	selector: 'app-config-company',
	templateUrl: './company.component.html'
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
	}
}
