var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var createHistory = require("history").createHistory;
var routes = require("./routes");

var scrollToTop = function () {
  window.scrollTo(0, 0);
};

var router = (
  <Router routes={ routes }
    onUpdate={ scrollToTop }
    history={ createHistory() } />
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(router, document.getElementById("root"));
});
