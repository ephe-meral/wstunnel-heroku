[![Build Status](https://travis-ci.org/ephe-meral/wstunnel-heroku.svg?branch=master)](https://travis-ci.org/ephe-meral/wstunnel-heroku)

## Websocket-tunnel service for Heroku

Deploys [this](https://www.npmjs.com/package/wstunnel) to a heroku instance, and lets you tunnel your traffic through a websocket to circumvent firewall restrictions.

---

**Requires:**
- [git](http://git-scm.com/)
- [ssh](http://www.openssh.com/)
- [node.js](https://nodejs.org/)
- [heroku-toolbelt](https://devcenter.heroku.com/articles/heroku-command)
- optionally: [travis-gem](https://rubygems.org/gems/travis)

**Setup:**
- Clone this repo (Optionally fork it if you want continuous deployment w/ travis)
- Create a new heroku app and push the repo
```shell
heroku create
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
heroku config:add DEST=localhost:22
git push heroku master
```
- Wait for Heroku to start the app, then run the client
```shell
npm install wstunnel -g
wstunnel ws://your-app.herokuapp.com:80
```

**Travis continuous deployment goodness:**
- Init the deploy script, then push the changes to your fork: (you need to activate travis for your repo first)
```shell
travis encrypt $(heroku auth:token) --add deploy.api_key
git commit -am 'changed heroku api key'
git push
```
