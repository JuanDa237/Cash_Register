import { Component, OnInit } from '@angular/core';

//Models
import { Category } from "../../models/category";

//Services
import { CategoriesService } from "../../services/categories/categories.service";

//Imports
import Swal from 'sweetalert2'; //Sweet Alert
import { datatableLanguage } from "../../../../models/datatables"; //Datatable

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  public categories: Array<Category>;
  public category: Category;
  public create: boolean;
  public dtOptions: DataTables.Settings;

  constructor(
    private categoriesService: CategoriesService
  ) {
    this.categories = null;
    this.category = {
      id: 0,
      name: ""      
    }; 
  }

  ngOnInit(): void {

    this.getCategories();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage
    }
  }

  private getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      response => {
        if(response.length >= 0) {

          this.categories = response;
        }
      },
      error => console.log(<any>error)
    );
  }

  //Methods for html
  public changeModal(category: Category): void {

    if(category != null && this.validateCategory(category)) {

      this.create = false;
      this.category = {
        id: category.id,
        name: category.name
      };
    }
    else {
      
      this.create = true;
      this.category = {
        id: 0,
        name: ""        
      };
    }
  }

  public createCategory(): void {

    if(this.validateCategory(this.category)) {

      this.categoriesService.saveCategory(this.category).subscribe(
        res => {
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se creo satisfactoriamente la categoria.',
            showConfirmButton: false,
            timer: 1500
          });

          this.getCategories();
        },
        err => console.log(<any>err)
      );
    }
    else {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Algo salio mal!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public updateCategory(): void {

    if(this.validateCategory(this.category)) {
      
      this.categoriesService.updateCategory(this.category).subscribe(
        res => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se actualizo satisfactoriamente la categoria.',
            showConfirmButton: false,
            timer: 1500
          });

          this.getCategories();
        },
        err => console.log(<any>err)
      );
    }
    else {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Algo salio mal!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public deleteCategory(category: Category): void {
    
    if(this.validateCategory(category)) {

      this.create = false;
      this.category = {
        id: category.id,
        name: category.name
      };

      Swal.fire({
        title: '¿Estas seguro de eliminar la categoria?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.value) {

          this.categoriesService.deleteCategory(this.category.id).subscribe(
            res => {
              
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se elimino satisfactoriamente la categoria.',
                showConfirmButton: false,
                timer: 1500
              });

              this.getCategories();            
            },
            err => console.log(<any>err)
          ); 
        }
      });
    }
  }

  public enterEvent(event: any): void {
    if(this.create) {
      this.createCategory();      
    }
    else {
      this.updateCategory();
    }    
  }

  private validateCategory(category: Category): boolean {

    if(category.id != null && category.name.trim() != "" && category.name != null)
      return true;
    
    return false
  }
}
