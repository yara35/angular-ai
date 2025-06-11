import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,MatDialogModule,
    MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'QuickPeek';
}
