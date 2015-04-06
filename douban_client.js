Douban = {};

Douban.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }
  
  var config = ServiceConfiguration.configurations.findOne({service: 'douban'});
  
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  
  var credentialToken = Random.secret(),
      loginStyle      = OAuth._loginStyle('weibo', config, options),
      loginUrl        = 'https://www.douban.com/service/auth2/auth' +
                        '?response_type=code' +
                        '&client_id=' + config.clientId +
                        '&redirect_uri=' + OAuth._redirectUri('douban', config, null, {replaceLocalhost: config.replaceLocalhost}) +
                        '&state=' + OAuth._stateParam(loginStyle, credentialToken);
    
  OAuth.launchLogin({
    loginService: 'douban',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
}