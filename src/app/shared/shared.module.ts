import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        CommonModule
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective
    ]
})
export class SharedModule {}