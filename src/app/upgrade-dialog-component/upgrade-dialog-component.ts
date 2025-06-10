import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-upgrade-dialog-component',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './upgrade-dialog-component.html',
  styleUrl: './upgrade-dialog-component.css'
})
export class UpgradeDialogComponent {

}
