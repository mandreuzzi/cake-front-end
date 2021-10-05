import { Component, OnInit } from '@angular/core';
import cakeAppConfig from '../../config/cake-app-config';

// @ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';

import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.svg',
      features: {
        registration: false
      },
      baseUrl: cakeAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: cakeAppConfig.oidc.clientId,
      redirectUri: cakeAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: cakeAppConfig.oidc.issuer,
        scopes: cakeAppConfig.oidc.scopes
      }

    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl(
    {
      el: '#okta-sign-in-widget'
    },
    (response: { status: string; }) => {
      if(response.status === 'SUCCESS'){
        this.oktaAuthService.signInWithRedirect();
      }
    },
    (error: any) => {
      throw error;
    }
    );
  }

}
