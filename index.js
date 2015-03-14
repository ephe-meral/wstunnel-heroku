var fs = require('fs'),
    crypto = require('crypto');
var buffersEqual = require('buffer-equal-constant-time'),
    ssh2 = require('ssh2'),
    utils = ssh2.utils,
    Server = ssh2.Server;

var pubKey = utils.genPublicKey(utils.parseKey(fs.readFileSync('user.pub')));

new Server({
  privateKey: fs.readFileSync('host.key')
}, function(client) {
  console.log('Client connected!');

  client.on('authentication', function(ctx) {
    if (ctx.method === 'password'
        && ctx.username === 'foo'
        && ctx.password === 'bar')
      ctx.accept();
    else if (ctx.method === 'publickey'
             && ctx.key.algo === pubKey.fulltype
             && buffersEqual(ctx.key.data, pubKey.public)) {
      if (ctx.signature) {
        var verifier = crypto.createVerify(ctx.sigAlgo);
        verifier.update(ctx.blob);
        if (verifier.verify(pubKey.publicOrig, ctx.signature, 'binary'))
          ctx.accept();
        else
          ctx.reject();
      } else {
        // if no signature present, that means the client is just checking
        // the validity of the given public key
        ctx.accept();
      }
    } else
      ctx.reject();
  }).on('ready', function() {
    console.log('Client authenticated!');

    client.on('session', function(accept, reject) {
      var session = accept();
      session.once('exec', function(accept, reject, info) {
        console.log('Client wants to execute: ' + inspect(info.command));
        var stream = accept();
        stream.stderr.write('Oh no, the dreaded errors!\n');
        stream.write('Just kidding about the errors!\n');
        stream.exit(0);
        stream.end();
      });
    });
  }).on('end', function() {
    console.log('Client disconnected');
  });
}).listen(0, '127.0.0.1', function() {
  console.log('Listening on port ' + this.address().port);
});
