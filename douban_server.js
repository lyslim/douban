Douban = {};

OAuth.registerService('douban', 2, null, function (query) {
  var response    = getTokenResponse(query),
      identity    = getIdentity(response.access_token),
      serviceData = {
        id: response.douban_user_id,
        accessToken: response.access_token,
        name: identity.name,
        expiresAt: (+new Date) + (1000 * response.expires_in)
      };
      
      if (response.refresh_token) {
        serviceData.refreshToken = response.refresh_token;
      };

      return {
        serviceData: serviceData,
        options: {profile: identity}
      };
});

// get access token, response format:
// {
//     "access_token": "",
//     "douban_user_name": "",
//     "douban_user_id": "",
//     "expires_in": ,
//     "refresh_token": ""
// }
var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'douban'}),
      response;
  
  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }
  
  try {
    response = HTTP.post(
      'https://www.douban.com/service/auth2/token', {params: {
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        redirect_uri: OAuth._redirectUri('douban', config, null, {replaceLocalhost: config.replaceLocalhost}),
        grant_type: 'authorization_code',
        code: query.code
      }}
    );
  } catch (err) {
    throw _.extend(new Error('Failed to complete OAuth handshake with Douban. ' + err.message), 
                  {response: err.response});
  }
  
  if (response.code) {
    throw new Error('Failed to complete OAuth handshake with Douban. code: '+ response.code+
    ', msg: '+response.msg);
  }else{
    return response.data;
  }
};

// get login user identity, response format:
// {
//     "loc_id": "108288",
//     "name": "",
//     "created": "2012-07-10 14:26:02",
//     "is_banned": false,
//     "is_suicide": false,
//     "loc_name": "北京",
//     "avatar": "",
//     "signature": "...",
//     "uid": "",
//     "alt": "",
//     "desc": "..",
//     "type": "user",
//     "id": "",
//     "large_avatar": ""
// }
var getIdentity = function (accessToken) {
  try {
    return HTTP.get('https://api.douban.com/v2/user/~me', {headers: {
      Authorization: 'Bearer ' + accessToken
    }}).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Douban. " + err.message),
                       {response: err.response});
  } 
};

Douban.retrieveCredential = function (credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

