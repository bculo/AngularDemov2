import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    { path: '', component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule, FormsModule],
    exports: [AuthComponent],
    declarations: [AuthComponent]
})
export class AuthModule {

}