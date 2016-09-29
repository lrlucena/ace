define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var JavaScriptMode = require("./javascript").Mode;
var PotigolHighlightRules = require("./potigol_highlight_rules").PotigolHighlightRules;

var Mode = function() {
    JavaScriptMode.call(this);

    this.HighlightRules = PotigolHighlightRules;
};
oop.inherits(Mode, JavaScriptMode);

(function() {

    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/potigol";
}).call(Mode.prototype);

exports.Mode = Mode;
});
