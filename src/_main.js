import L from 'leaflet';

// base
import Vector from './Vector.js';
L.Vector = Vector;

import Cell from './Cell.js';
L.Cell = Cell;

import Field from './Field.js';
L.Field = Field;

import ScalarField from './ScalarField.js';
L.ScalarField = ScalarField;

import VectorField from './VectorField.js';
L.VectorField = VectorField;

// layer
require('./layer/L.CanvasLayer.js');
require('./layer/L.CanvasLayer.SimpleLonLat.js');
require('./layer/L.CanvasLayer.Field.js');
require('./layer/L.CanvasLayer.ScalarField.js');
require('./layer/L.CanvasLayer.VectorFieldAnim.js');

// control
require('./control/L.Control.ColorBar.js');

/* eslint-disable no-console */
console.log('leaflet.canvaslayer.field v1.4.1 (in progress...)');
/* eslint-enable no-console */

var chroma = require('chroma-js'); // Version 0.6.x

L.chroma = chroma;

export default L;
