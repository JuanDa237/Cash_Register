import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Category } from "../../../categories/models/category";
import { Product } from "../../../product/models/product";
import { Ingredient } from "../../../ingredients/models/ingredient";
import { IngredientInProduct } from "../../../ingredients/models/ingredientInProduct";

//Services
import { CategoriesService } from "../../../categories/services/categories/categories.service";
import { ProductsService } from "../../../product/services/products/products.service";
import { IngredientsService } from "../../../ingredients/services/ingredients/ingredients.service";

//Imports
import Swal from 'sweetalert2'; //Sweet Alert
import { datatableLanguage } from "../../../../models/datatables"; //Datatable
import { Chart } from "chart.js"; //Datatable

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  
  public product: Product;

  //Datatable
  public dtOptions: DataTables.Settings;
  
  //To manage Ingredients
  public ingredientsInProduct: Array<IngredientInProduct>;
  private spendingAmountConst: Array<number>;
  
  //To manage Ingredients In Product
  public spendingAmount: Array<number>;
  public ingredients: Array<Ingredient>;

  //To manage Category
  public categoryOfTheProduct;
  public categories: Array<Category>;
  public chosenCategory: Category;

  //To know if is a edit page
  public edit: boolean;

  //Chart
  private myChart: Chart;
  
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private ingredientsService: IngredientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = null;
    this.categoryOfTheProduct = null;
    this.ingredients = null;
    this.spendingAmount = new Array<number>(1);
    this.spendingAmountConst = new Array<number>(1);
    this.chosenCategory = null;
    this.myChart = null;
  }

  ngOnInit(): void {
    this.getUrlParams();
    this.getCategories();

    //Lenguage Settings
    this.dtOptions = {
      "language": datatableLanguage,
      "lengthChange": false,
      "info": false
    }
  }

  private getUrlParams(): void {
    var id: number = this.activatedRoute.snapshot.params.id;

    if(id != null) {
      this.edit = true;

      this.productsService.getProduct(id).subscribe(
        res => {
          this.product = res[0];

          this.categoriesService.getCategory(this.product.idCategory).subscribe(
            res => {
              this.categoryOfTheProduct = res[0];
              this.chosenCategory = this.categoryOfTheProduct;

              this.getIngredients();
            },
            err => console.log(<any>err)
          );          
        },
        err => console.log(<any>err)
      );
    }
    else {

      this.edit = false;
      this.product = {
        id: 0,
        idCategory: null,
        name: "",
        price: 0
      }

      this.getIngredients();
    }
  }

  private getIngredients(): void {

    this.ingredientsService.getIngredients().subscribe(
      res => {

        this.ingredients = res;

        if(this.edit) {
          
          this.productsService.getIngredientsInProduct(this.product.id).subscribe(
            res => {

              this.ingredientsInProduct = res;                          

              if(this.ingredientsInProduct == null || this.ingredientsInProduct.length == 0) {

                for(let i = 0; i < this.ingredients.length; i++) {

                  this.spendingAmount[i] = null;
                }                
              }
              else {

                for(let i = 0; i < this.ingredients.length; i++) {

                  for(let y = 0; y < this.ingredientsInProduct.length; y++) {

                    if(this.ingredients[i].id == this.ingredientsInProduct[y].idIngredient) {
                      
                      this.spendingAmount[i] = this.ingredientsInProduct[y].spendingAmount;
                    }
                  }               
                }
              }

              for(let i = 0; i < this.ingredients.length; i++) {                
                this.spendingAmountConst[i] = this.spendingAmount[i];
              }

              this.actualizeUtility();
            },
            err => console.log(<any>err)
          );
        }
        else {
          for(let i = 0; i < this.ingredients.length; i++) {
            this.spendingAmount[i] = null;
            this.spendingAmountConst[i] = null;
          }
        }
      },
      err => console.log(<any>err)
    );
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

  //html methods

  protected saveNewProduct(): void {
    
    if(this.validateProduct()) {

      this.productsService.saveProduct(this.product).subscribe(
        res => {
          var id: number = res.id;

          for(let i = 0; i < this.ingredients.length; i++) {
            if(this.spendingAmount[i] != null && this.spendingAmount[i] != 0) {
              
              //Create Relation
              let newIngredientInProduct: IngredientInProduct = {
                idProduct: id,
                idIngredient: this.ingredients[i].id,
                spendingAmount: this.spendingAmount[i]
              }

              this.productsService.createIngredientInProduct(newIngredientInProduct).subscribe(
                res => {},
                err => console.log(<any>err)
              );
            }
          }

          this.router.navigate(["/products"]);          
        },
        err => console.log(<any>err)
      );
    }
    else {

    }
  }

  protected updateProduct(): void {
    
    if(this.validateProduct()) {

      Swal.fire({
        title: '¿Estas seguro de editar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.value) {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se edito satisfactoriamente el producto.',
            showConfirmButton: false,
            timer: 1500
          })
          
          for(let i = 0; i < this.ingredients.length; i++) {
            //Update relations
            
            if(this.spendingAmountConst[i] != this.spendingAmount[i]) {
            
              if(this.spendingAmount[i] == 0 || this.spendingAmount[i] == null) {
                //Delete

                var id: number;

                for(var x = 0; x < this.ingredientsInProduct.length; x++) {

                  if(this.ingredientsInProduct[x].idProduct == this.product.id && this.ingredientsInProduct[x].idIngredient == this.ingredients[i].id)
                    id = this.ingredientsInProduct[x].id;
                }

                this.productsService.deleteIngredientInProduct(id).subscribe(
                  res => {},
                  err => console.log(<any>err)
                );
              }  
              else if(this.spendingAmountConst[i] == null) {
                //Create
                var newIngredientsInProduct: IngredientInProduct = {
                  idIngredient: this.ingredients[i].id,
                  idProduct: this.product.id,
                  spendingAmount: this.spendingAmount[i]
                };
                
                this.productsService.createIngredientInProduct(newIngredientsInProduct).subscribe(
                  res => {},
                  err => console.log(<any>err)
                );
              }
              else {
                //Update
                var updatedIngredientsInProduct: IngredientInProduct = {
                  id: this.ingredientsInProduct[i].id, 
                  idIngredient: this.ingredients[i].id,
                  idProduct: this.product.id,
                  spendingAmount: this.spendingAmount[i]
                };
                
                this.productsService.updateIngredientInProduct(updatedIngredientsInProduct).subscribe(
                  res => {},
                  err => console.log(<any>err)
                );
              }
          }                     
        }
        
        this.productsService.updateProduct(this.product).subscribe(
          res => {
            this.router.navigate(["/products"]);
            },
            err => console.log(<any>err)           
          );
        }
      });
    }
  }

  protected deleteProduct(): void {
    Swal.fire({
      title: '¿Estas seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se elimino satisfactoriamente el producto.',
          showConfirmButton: false,
          timer: 1500
        });
        this.productsService.deleteProduct(this.product.id).subscribe(
          res => {
            this.router.navigate(["/products"]);
          },
          err => console.log(<any>err)
        );        
      }
    });      
  }

  //Usefull methods

  private validateProduct(): boolean {
    
    this.product.name = this.product.name.trim();

    if(this.product.name.length >= 1)  
      return true;
    
    return false;
  }

  private actualizeUtility(): void {
    
    var nameOfIngredients: Array<string> = new Array<string>(0);
    var percentOfIngredients: Array<number> = new Array<number>(0);
    
    var priceOfIngredients: number = 0;
    var utility: number = 0;

    for(var i = 0; i < this.ingredients.length; i++) {

      if(this.spendingAmount[i] != null && this.spendingAmount[i] != 0) {
        
        nameOfIngredients.push(this.ingredients[i].name);

        var aux = this.ingredients[i].priceByUnit * this.spendingAmount[i];

        percentOfIngredients.push(aux);
        priceOfIngredients += aux;
      }
    }
    
    utility = this.product.price - priceOfIngredients;

    if(this.myChart != null) {
      
      this.myChart.destroy();
    }
    
    nameOfIngredients.push("Utilidad");
    percentOfIngredients.push(utility);

    this.myChart = new Chart("myChart", {
                type: 'pie',
                data: {
                    labels: nameOfIngredients,
                    datasets: [
                      {
                        label: 'Porcentaje',
                        data: percentOfIngredients,
                        backgroundColor: function(): string {
                          
                          if(utility <= 0) {
                            return 'rgba(217, 83, 79, 0.5)';
                          }
                          else {
                            return 'rgba(0, 123, 255, 0.5)';
                          }
                        }
                      }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
  }
}
