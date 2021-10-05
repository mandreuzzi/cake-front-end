import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated: boolean = false;

  title = 'cake-front-end';

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
    (result: boolean) => {
      this.isAuthenticated = result;
      }
    );
    this.oktaAuthService.isAuthenticated().then(
    value => {
      this.isAuthenticated = value;
      }
    );
  }


}
