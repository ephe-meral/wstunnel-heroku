**Websocket-tunnel service for Heroku**

Deploys [this](https://www.npmjs.com/package/wstunnel) to your heroku instance, and lets you tunnel your traffic through a Heroku-based websocket.

---

Fork this repo, then clone it and setup it as follows:

Init the deploy script, and deploy: (travis gem required)

```shell
travis encrypt $(heroku auth:token) --add deploy.api_key
git commit -am 'changed heroku api key'
git push
```

Wait for travis to deploy, then run the client: (node.js required)

```shell
npm install wstunnel -g
wstunnel -t 8080:google.com:80 ws://your-app.herokuapp.com:80
```
