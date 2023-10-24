import { Component } from '@angular/core';
import { UtilModelFormsDemoComponent } from 'util-model-forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UtilModelFormsDemoComponent],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Modern Angular Applications</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Model-driven Forms</li>
          <li>Generic programming w/ Angular</li>
        </ul>
      </div>
    </div>

    <model-forms-demo />
  `,
  styles: [`
    code {
      color: blue;
    }
  `]
})
export class HomeComponent {
}
