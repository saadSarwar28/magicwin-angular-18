import { NgModule } from "@angular/core";
import { ImageSizeValidatorDirective } from "./image-size-validator.directive";
import { NumbersOnlyDirective } from "./numbers-only.directive";
import { DownloadImageDirective } from "./download-image.directive";
import { NumericMaxlengthDirective } from "./numeric-maxlength.directive";
import { SpaceRemoverDirective } from "./removeSpace.directive";
import { InViewDirective } from "./in-view.directive";
import { DisableAutofillDirective } from "./disable-autofill.directive";

@NgModule({
  declarations: [
    NumericMaxlengthDirective,
    ImageSizeValidatorDirective,
    NumbersOnlyDirective,
    DownloadImageDirective,
    SpaceRemoverDirective, InViewDirective, DisableAutofillDirective], // Declare your directive
  imports: [],
  exports: [
    NumbersOnlyDirective,
    NumericMaxlengthDirective,
    ImageSizeValidatorDirective,
    DownloadImageDirective,
    SpaceRemoverDirective, InViewDirective, DisableAutofillDirective] // Export your directive
})

export class DirectiveModule { }
