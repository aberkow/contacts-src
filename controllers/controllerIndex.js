//export an index of all the controllers. Helps with maintenance.

module.exports = function(router){
  require('./contacts').default(router);
}
