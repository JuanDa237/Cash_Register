import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/modules/others/app-common/components';
import { Sweet } from '@app/modules/others/app-common/libs';
import { UserService } from '@app/modules/others/configuration/services';
import { AdminsFormComponent } from '../../components';
import { Admin, createEmptyAdmin } from '../../model';
import { SingUpService } from '../../services';

@Component({
	selector: 'app-admins',
	templateUrl: './admins.component.html'
})
export class AdminsComponent implements OnInit {
	public admins: Admin[];
	public creating: boolean;

	public loading: boolean;

	public invalidForm: boolean;

	@ViewChild(AdminsFormComponent)
	public formChild!: AdminsFormComponent;

	@ViewChild(TableComponent)
	private table!: TableComponent;

	private sweet: Sweet;

	constructor(private userService: UserService, private singUpService: SingUpService) {
		this.admins = new Array<Admin>(0);
		this.creating = false;
		this.invalidForm = false;
		this.loading = true;
		this.sweet = new Sweet();
	}

	ngOnInit(): void {
		this.getAdmins();
	}

	private getAdmins(): void {
		this.userService.getAdmins().subscribe(
			(response) => {
				this.admins = response;
				this.loading = false;
				this.table.renderTable();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	// Html methods

	public changeModal(admin: any | null): void {
		if ((this.creating = admin == null))
			this.formChild.setAdminValues(createEmptyAdmin(), false);
		else this.formChild.setAdminValues(admin, true);
	}

	// Categories methods
	public createOrUpdateAdmin(): void {
		this.creating ? this.createAdmin() : this.updateAdmin();
	}

	private createAdmin(): void {
		var admin: Admin = this.formChild.getAdminValues();
		if (this.validateAdmin(admin)) {
			this.singUpService.singUpAdmin(admin).subscribe(
				(response) => {
					admin.id = response.id;
					admin.company = response.company;
					this.admins.push(admin);

					// Events
					this.table.rerenderTable();
					this.sweet.created('Se creo la categoria satisfactoriamente');
				},
				(error) => {
					if (error.status == 401 && error.error.message != '') {
						this.sweet.error(`El usuario '${admin.username} esta en uso.'`);
					} else {
						this.sweet.error('Ocurrio un error.');
						throw new Error(error);
					}
				}
			);
		}
	}

	private async updateAdmin(): Promise<void> {
		var admin: Admin = this.formChild.getAdminValues();
		if (this.validateAdmin(admin)) {
			this.userService.updateUser(admin).subscribe(
				(response) => {
					const index: number = this.admins
						.map((x) => {
							return x.id;
						})
						.indexOf(admin.id);
					this.admins[index] = admin;

					// Events
					this.table.rerenderTable();
					this.sweet.created('Se edito el usuario satisfactoriamente');
				},
				(error) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	public async deleteAdmin(admin: any): Promise<void> {
		if (
			this.validateAdmin(admin) &&
			(await this.sweet.delete('¿Estas seguro de eliminar el usuario?'))
		) {
			this.userService.deleteUser(admin.id).subscribe(
				() => {
					const index: number = this.admins
						.map((x) => {
							return x.id;
						})
						.indexOf(admin.id);
					this.admins.splice(index, 1);

					// Events
					this.table.rerenderTable();
					this.sweet.deleted('Se elimino el usuario satisfactoriamente');
				},
				(error: any) => {
					this.sweet.error('Ocurrio un error');
					throw new Error(error);
				}
			);
		}
	}

	// Auxiliary methods

	private validateAdmin(admin: Admin): boolean {
		return admin != null && admin.username.trim() != '' && admin.name.trim() != '';
	}
}
