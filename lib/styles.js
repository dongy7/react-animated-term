'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var windowStyle = exports.windowStyle = {
  width: '100%',
  height: '100%',
  bprderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(51, 51, 51)',
  borderRadius: '5px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 1px 2px 5px 0px',
  background: 'rgb(0, 0, 0)',
  position: 'relative'
};

var terminalStyle = exports.terminalStyle = {
  width: '100%',
  height: '240px'
};

var headerStyle = exports.headerStyle = {
  width: '100%',
  top: '18px',
  position: 'absolute'
};

var windowButtonStyle = exports.windowButtonStyle = {
  borderRadius: '50%',
  display: 'inline-block',
  width: '12px',
  height: '12px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)'
};

var closeButtonStyle = exports.closeButtonStyle = {
  backgroundColor: 'rgb(255, 95, 86)',
  left: '13px'
};

var minimizeButtonStyle = exports.minimizeButtonStyle = {
  backgroundColor: 'rgb(255, 189, 46)',
  left: '33px'
};

var maximizeButtonStyle = exports.maximizeButtonStyle = {
  backgroundColor: 'rgb(39, 201, 63)',
  left: '53px'
};

var bodyStyle = exports.bodyStyle = {
  width: '100%',
  height: '100%',
  marginTop: '60px',
  position: 'absolute'
};

var consoleStyle = exports.consoleStyle = {
  color: 'rgb(255, 255, 255)',
  fontSize: '12px',
  fontFamily: 'Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace',
  lineHeight: '24px',
  margin: '0px 16px'
};

var codeStyle = exports.codeStyle = {
  fontSize: '12px',
  fontFamily: 'Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace',
  lineHeight: '20px',
  margin: '0px',
  whiteSpace: 'pre-wrap'
};

var promptStyle = exports.promptStyle = {
  color: 'rgb(204, 204, 204)'
};

var cursorStyle = exports.cursorStyle = {
  background: 'rgba(248,28,229)',
  display: 'inline-block',
  width: '6px',
  height: '15px',
  verticalAlign: 'middle'
};