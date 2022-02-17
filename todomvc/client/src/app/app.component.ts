import { Component, OnInit } from '@angular/core';
import { PersistanceService } from './shared/services/persistance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private persistanceService: PersistanceService) {
  }

  public ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null) {
      this.persistanceService.setToken(potentialToken)
    }
  }


}
