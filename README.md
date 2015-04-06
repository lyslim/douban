# Meteor OAuth flow implementation for Douban

Usage:

1. Install [Meteor](https://www.meteor.com/install "Meteor").
2. `Meteor add service-configuration`
3.  Apply for [douban API key](http://developers.douban.com/apikey/apply "douban API key").
    For local test, please maintain the following callback path:
```
  http://127.0.0.1:3000/_oauth/douban
```

4. Provide douban api key, secret and configuratons on server code, e.g.
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

5. `Meteor add accounts-douban`, this will essentially install both `accounts-douban` and `douban` packages.

6. Play with function `loginWithDouban` in client code, e.g.
```javascript
  Meteor.loginWithDouban(/*options*/, /*callback function*/); 
```

Enjoy!

Reference:

1. [Douban OAuth doc](http://developers.douban.com/wiki/?title=oauth2#server_side_flow).
2. Meteor [loginWith<ExternalService>](http://docs.meteor.com/#/full/meteor_loginwithexternalservice). 

Note:

Current design follows other Meteor oauth services, which is highly coupled with Meteor package oauth and oauth2.

TO-DO:

Different client(other than desktop) implementations.
