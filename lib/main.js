var provider = require('./provider.js');
var exec = require('child_process').exec;
var fs = require('fs');

module.exports = {

  activate: (function(_this) {
     return function(state) {
       return atom.commands.add("atom-workspace", {
         "core:save": function(event) {
           console.log('saved');

           try {
                    var root = atom.project.getPaths()[0];
                    var json = require(root+'/atomizer.json');

                    var cmd = __dirname + '/../node_modules/atomizer/bin/atomizer -c ' + root + '/.atomizer-config.js' + ' -o ' + root + '/' + json.output + ' ' + root + '/' + json.input;

                    fs.writeFileSync(root + '/.atomizer-config.js', 'module.exports = ' + JSON.stringify(json.config));

                      exec(cmd, function(error, stdout, stderr) {
                          console.log(stderr);
                          fs.unlink(root + '/.atomizer-config.js');
                      });
           }
            catch (e) {
    console.log(e);
}

         }
       });
     };
   })(this),

  getProvider: function(){
    return provider
  }
}
