Package.describe({
  name: 'theycallmek:douban',
  version: '0.1.0',
  summary: 'Meteor OAuth2 implementation with douban',
  git: 'https://github.com/lyslim/douban',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.5');
  
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);
  
  api.export('Douban');
    
  api.addFiles('douban_server.js', 'server');
  api.addFiles('douban_client.js', 'client');
  
});
