(function() {
  
  // Set initial variables
  var el = null;
  var xAxisEl = null;
  var yAxisEl = null;
  var zAxisEl = null;
  var data = null;
  var r = null

  var dataPath = "data/dr7qso.json";

  // Callback function for when an axis is selected. This function formats and
  // plots the data.
  function plot() {
    // Get the axes values
    var x = xAxisEl.value;
    var y = yAxisEl.value;
    var z = zAxisEl.value;
    
    // Make sure all axes are selected
    if (x === "" || y === "" || z === "")
      return;
      
    // Select the data
    var plotData = data.map(function(d) {
      var obj = {}
      obj[x] = parseFloat(d[x]);
      obj[y] = parseFloat(d[y]);
      obj[z] = parseFloat(d[z]);

      return obj;
    });
    
    // Plot the data!
    r.plot(plotData);
  }

  // Run this function when the DOM is ready.
  function DOMReady() {
    
    // Get DOM elements
    el = document.querySelector("div.ruse");
    xAxisEl = document.querySelector("select.x");
    yAxisEl = document.querySelector("select.y");
    zAxisEl = document.querySelector("select.z");
    
    // Set up the ruse object using a DOM element, width and height
    r = new ruse(el, 800, 500);
    
    // Request data from local server using an XHR
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataPath);
    
    xhr.onload = function(e) {
      // Get data from the response
      data = JSON.parse(e.target.response);
    
      xAxisEl.onchange = plot;
      yAxisEl.onchange = plot;
      zAxisEl.onchange = plot;
    }
    
    // Send off the XHR!
    xhr.send();
  }
  console.log('here');
  window.addEventListener('DOMContentLoaded', DOMReady, false);
})()