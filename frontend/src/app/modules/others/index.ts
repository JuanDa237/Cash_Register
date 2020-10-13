import { CashRegisterModule } from "./cash-register/cash-register.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { ClientsModule } from "./clients/clients.module";
import { TicketsModule } from "./tickets/tickets.module";
import { ConfigurationCompanyModule } from "./configuration-company/configuration-company.module";

export const modules = [
    CashRegisterModule,
    CategoriesModule,
    ProductsModule,
    IngredientsModule,
    ClientsModule,
    TicketsModule,
    ConfigurationCompanyModule
]

export * from "./cash-register/cash-register.module";
export * from "./categories/categories.module";
export * from "./products/products.module";
export * from "./ingredients/ingredients.module";
export * from "./clients/clients.module";
export * from "./tickets/tickets.module";
export * from "./configuration-company/configuration-company.module";