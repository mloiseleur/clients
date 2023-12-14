import { DialogRef } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { SetPinComponent as BaseSetPinComponent } from "@bitwarden/angular/auth/components/set-pin.component";
import { JslibModule } from "@bitwarden/angular/jslib.module";
import { DialogModule, DialogService } from "@bitwarden/components";

@Component({
  standalone: true,
  templateUrl: "set-pin.component.html",
  imports: [DialogModule, CommonModule, JslibModule],
})
export class SetPinComponent extends BaseSetPinComponent {
  static open(dialogService: DialogService): DialogRef<SetPinComponent> {
    return dialogService.open(SetPinComponent);
  }
}
