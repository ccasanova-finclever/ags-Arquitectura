// Validación de erp-calc.js contra los totales reales del Excel base.
// Ejecutar: node erp-calc.test.js
const C = require('./erp-calc.js');

// Datos de entrada reales (hoja SUPxPISO, niveles -2..13 + SM), orden abajo→arriba.
const levels = [
  { nivel:-2, depto:0, bodega:92, local:0, estVend:110, estVis:0, perimClim:3062.15, poliComun:3062.15, vacioAsc:0, vacioEsc:0, shaftComun:0, shaftInt:0, terrConstr:0, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:272.36, otrasComercio:0, radierCubierta:3062.15 },
  { nivel:-1, depto:0, bodega:77, local:0, estVend:108, estVis:0, perimClim:3062.15, poliComun:3062.15, vacioAsc:0, vacioEsc:0, shaftComun:0, shaftInt:0, terrConstr:0, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:214.99, otrasComercio:0, radierCubierta:0 },
  { nivel:1, depto:0, bodega:0, local:5, estVend:16, estVis:46, perimClim:820.05, poliComun:620.45, vacioAsc:0, vacioEsc:0, shaftComun:4, shaftInt:0, terrConstr:0, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:199.6, radierCubierta:0 },
  { nivel:2, depto:18, bodega:0, local:0, estVend:0, estVis:0, perimClim:1285.99, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:7.2, terrConstr:208.9, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:3, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:4, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:5, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:6, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:7, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:8, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:9, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:10, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:11, depto:20, bodega:0, local:0, estVend:0, estVis:0, perimClim:1438.33, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:8, terrConstr:240.34, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:12, depto:16, bodega:0, local:0, estVend:0, estVis:0, perimClim:1133.66, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:6.4, terrConstr:177.46, terrAzotea:0, terrComunAzotea:110.34, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:13, depto:16, bodega:0, local:0, estVend:0, estVis:0, perimClim:1133.66, poliComun:225.97, vacioAsc:14.87, vacioEsc:48.4, shaftComun:4, shaftInt:6.4, terrConstr:177.46, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 },
  { nivel:'SM', depto:0, bodega:0, local:0, estVend:0, estVis:0, perimClim:90.52, poliComun:90.52, vacioAsc:14.3, vacioEsc:12.54, shaftComun:0, shaftInt:0, terrConstr:0, terrAzotea:0, terrComunAzotea:0, terrMunicipal:0, otrasBodega:0, otrasComercio:0, radierCubierta:0 }
];

// Totales esperados (fila TOTAL del Excel, hoja SUPxPISO).
const expected = {
  'muni.X (útil deptos)':      [13694.64, null],
  'muni.Y (comercio)':         [199.6,    null],
  'muni.Z (bodegas)':          [487.35,   null],
  'muni.AA (estacionamientos)':[2725,     null],
  'muni.AC (uso común)':       [5496.48,  null],
  'muni.AD (útil)':            [17106.59, null],
  'muni.AE (común)':           [5496.48,  null],
  'muni.AF (total)':           [22603.07, null],
  'constr.AO (total losa)':    [27118.65, null],
  'constr.AP (radier)':        [3062.15,  null],
  'constr.AQ (total construido)':[30180.80, null],
  'com.AT (útil interior)':    [13786.64, null],
  'com.AU (terrazas 50%)':     [1363.44,  null],
  'com.AX (útil total)':       [15349.68, null],
  'com.AY (bodegas)':          [487.35,   null],
  'com.AZ (común)':            [6334.56,  null]
};

const res = C.computeSurfaces(levels);
const T = res.totals;
const got = {
  'muni.X (útil deptos)': T.muni.X, 'muni.Y (comercio)': T.muni.Y, 'muni.Z (bodegas)': T.muni.Z,
  'muni.AA (estacionamientos)': T.muni.AA, 'muni.AC (uso común)': T.muni.AC, 'muni.AD (útil)': T.muni.AD,
  'muni.AE (común)': T.muni.AE, 'muni.AF (total)': T.muni.AF,
  'constr.AO (total losa)': T.constr.AO, 'constr.AP (radier)': T.constr.AP, 'constr.AQ (total construido)': T.constr.AQ,
  'com.AT (útil interior)': T.com.AT, 'com.AU (terrazas 50%)': T.com.AU, 'com.AX (útil total)': T.com.AX,
  'com.AY (bodegas)': T.com.AY, 'com.AZ (común)': T.com.AZ
};

let ok = true;
const TOL = 0.02; // tolerancia 2 céntimos (redondeos acumulados)
for (const k in expected) {
  const exp = expected[k][0], g = C.r2(got[k]);
  const pass = Math.abs(g - exp) <= TOL;
  if (!pass) ok = false;
  console.log((pass ? '✓' : '✗') + ' ' + k.padEnd(32) + ' calc=' + String(g).padStart(10) + '  excel=' + exp);
}
console.log(ok ? '\n>> MOTOR VALIDADO — todos los totales cuadran con el Excel.' : '\n>> ✗ HAY DIFERENCIAS.');
process.exit(ok ? 0 : 1);
