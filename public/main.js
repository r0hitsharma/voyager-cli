var libvoyager = require('datavoyager');

var container = document.getElementById("root");
var config = {
  showDataSourceSelector: false,
  hideHeader: false,
  hideFooter: true
}

global.voyagerInstance = libvoyager.CreateVoyager(container, config, undefined);
