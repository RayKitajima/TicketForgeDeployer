"use strict";

const TicketForge = require("./TicketForge.js");

const Craft = require("@craftkit/craft-uikit");
window.Craft = Craft;

module.exports = TicketForge.default || TicketForge;
