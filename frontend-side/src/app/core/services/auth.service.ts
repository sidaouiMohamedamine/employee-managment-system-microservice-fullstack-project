import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'empSec',
    clientId: 'empSec'
  });

  private keycloakUrl = 'http://localhost:8080/realms/empSec/protocol/openid-connect/token';
  private keycloakLogoutUrl = 'http://localhost:8080/realms/empSec/protocol/openid-connect/logout';
  private clientId = 'empSec';
  private clientSecret = '8lYgJQg2qi4mII7CGsMEZETa9mVBw0n2';
  constructor() { }
  
}
