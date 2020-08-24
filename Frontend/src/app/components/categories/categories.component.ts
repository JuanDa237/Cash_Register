import { Component, OnInit } from '@angular/core';

//Models
import { Category } from "../../models/category";

//Services
import { CategoriesService } from "../../services/categories/categories.service";

//Imports
import Swal from 'sweetalert2'; //Sweet Alert
import { datatableLanguage } from "../../models/datatables/datatables"; //Datatable

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
  public changeModal(id?: number, name?: string): void {
    if(id != null && name != null && name != "") {
      this.create = false;
      this.category = {
        id: id,
        name: name        
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

  public updateCategory(): void {
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

  public deleteCategory(id?: number, name?: string): void {
    if(id != null && name != null && name != "") {
      this.create = false;
      this.category = {
        id: id,
        name: name        
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
}
