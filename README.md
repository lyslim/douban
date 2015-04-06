# Meteor OAuth flow implementation for Douban

Usage:

0. Install Meteor - https://www.meteor.com/install
1. `Meteor add service-configuration`
2.  Apply for douban API key - http://developers.douban.com/apikey/apply.
    For local test, please maintain the following callback path:
```
  http://127.0.0.1:3000/_oauth/douban
```

3. Provide douban api key, secret and configuratons on server code like below
```javascript
  ServiceConfiguration.configurations.remove({service: 'douban'});
  ServiceConfiguration.configurations.upsert(
    {service: 'douban'},
    {
      $set: {
        clientId: DOUBAN_API_KEY,
        secret: DOUBAN_SECRET,
        loginStyle: 'redirect',
        replaceLocalhost: true 
      }
    }
  );
```

4. `Meteor add accounts-douban`, this will essentially install both `accounts-douban` and `douban` packages.

5. You are good to play with function `loginWithDouban` in your client code
```javascript
  Meteor.loginWithDouban({}, function (err) {
  }); 
```

Enjoy!

Note:

1. Visit http://developers.douban.com/wiki/?title=oauth2#server_side_flow for Douban OAuth 2.0 detail.
2. Current design follows other Meteor oauth services, which is highly coupled with Meteor package oauth and oauth2.

TO-DO:

Different client(other than desktop) implementations.
