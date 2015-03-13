## Websocket-tunnel service for Heroku

Deploys [this](https://www.npmjs.com/package/wstunnel) to a heroku instance, and lets you tunnel your traffic through a websocket to circumvent firewall restrictions.

---

- Install Node.js then fork this repo and clone it locally.
- Option 1: The manual Heroku way<br>
Create a new heroku app and push the repo: (heroku toolbelt required)
```shell
heroku create
git push heroku master
```
- Option 2: The Travis way<br>
Init the deploy script, then push the changes to your fork: (heroku toolbelt & travis gem required, you need to activate travis for your repo first, or manually push to your heroku app)
```shell
travis encrypt $(heroku auth:token) --add deploy.api_key
git commit -am 'changed heroku api key'
git push
```
- Wait for travis to deploy, then run the client: (node.js required)
```shell
npm install wstunnel -g
wstunnel -t 8080:google.com:80 ws://your-app.herokuapp.com:80
```
