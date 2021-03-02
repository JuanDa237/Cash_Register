// Libs
import Swal from 'sweetalert2';

export class Sweet {
	private bootstrapColors = {
		primary: '#007bff',
		info: '#17a2b8',
		danger: '#dc3545',
		warning: '#ffc107'
	};

	public async delete(message: string): Promise<boolean> {
		const response: boolean = await Swal.fire({
			title: message,
			icon: 'error',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			confirmButtonColor: this.bootstrapColors.danger,
			cancelButtonColor: this.bootstrapColors.info
		}).then((result) => {
			return result.isConfirmed;
		});

		return response;
	}

	public async update(message: string): Promise<boolean> {
		const response: boolean = await Swal.fire({
			title: message,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Editar',
			confirmButtonColor: this.bootstrapColors.info
		}).then((result) => {
			return result.isConfirmed;
		});

		return response;
	}

	public async create(message: string): Promise<boolean> {
		const response: boolean = await Swal.fire({
			title: message,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Crear',
			confirmButtonColor: this.bootstrapColors.info
		}).then((result) => {
			return result.isConfirmed;
		});

		return response;
	}

	public created(message: string): void {
		const toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			}
		});

		toast.fire({
			icon: 'success',
			title: message
		});
	}

	public deleted(message: string): void {
		const toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			}
		});

		toast.fire({
			icon: 'error',
			title: message
		});
	}

	public error(message: string): void {
		const toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			}
		});

		toast.fire({
			icon: 'error',
			title: message
		});
	}
}
