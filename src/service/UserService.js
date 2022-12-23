import Keycloak from "keycloak-js";
import {AUTH_API,ISSUER_API} from "../config";

const _kc = new Keycloak(({
    url: `${AUTH_API}`,
    issuer:`${ISSUER_API}`,
    realm: 'vendor-site-visit',
    clientId: 'vendor_site_visit_client'
}));

 const initKeycloak = () => {
  _kc.init({ onLoad: 'login-required',
             flow: 'implicit',
             pkceMethod: 'S256', }).then((auth) => {
    if (!auth) {
        window.location.reload();
    }

    localStorage.setItem("bearer-token", _kc.token);
    localStorage.setItem("login", _kc.login);
    localStorage.setItem("refresh-token", _kc.refreshToken);
    localStorage.setItem("token-parsed", _kc.tokenParsed.exp);
    localStorage.setItem("time-skew", _kc.timeSkew);
  })
};

const updateToken = () => {
  _kc.updateToken(60).then((refreshed) =>{
    if(!refreshed){
        console.warn('Token not refreshed, valid for '
        + Math.round( _kc.tokenParsed.exp + _kc.timeSkew - new Date().getTime() / 1000) + ' seconds');
    }
    else{
      console.debug('Token refreshed' + refreshed);
    }
  })
};

const token = localStorage.getItem("bearer-token", _kc.token);
const isLoggedIn = !!token;

const UserService = {
  initKeycloak,
  updateToken,
  isLoggedIn,
  token,
};

export default UserService;