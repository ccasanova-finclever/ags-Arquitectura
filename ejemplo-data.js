// Datos del proyecto de ejemplo (Edificio José Pedro Alessandri 1880, Ñuñoa).
// Tomados del Excel base AAMMDD-01-BASE-AP. ID fijo para que recargar actualice
// en vez de duplicar. Código según convención AANN+LLL (editable luego).
window.EJEMPLO_PROJECT = {
  id: '1749513600000',
  code: '2601NUN',
  name: 'Edificio José Pedro Alessandri 1880',
  comuna: 'Ñuñoa',
  status: 'desarrollo',
  createdAt: '2026-06-09',
  terreno: {
    comuna: 'Ñuñoa',
    lotes: [
      { calle: 'José Pedro Alessandri', numero: '1880', rolSII: '6539-019', zonaEdif: 'Z-2',
        zonaUso: '-', cipN: '1549', cipFecha: '2020-09-07', supBruta: '5030.27', supAUP: '0', supNeta: '5030.27' }
    ],
    poligonos: [
      { nombre: 'P1', ladoA: '48.31', ladoB: '15' },
      { nombre: 'P2', ladoA: '0', ladoB: '0' },
      { nombre: 'P3', ladoA: '0', ladoB: '0' },
      { nombre: 'P4', ladoA: '0', ladoB: '0' }
    ]
  },
  normativa: {
    params: {
      densidadBruta: { proyectado: '1598.63', permitido: '1600' },
      cantViviendas: { proyectado: '230', permitido: '230' },
      coefOcupSup:   { proyectado: '0.2107', permitido: '0.4' },
      supOcupSup:    { proyectado: '1059.99', permitido: '2012.108' },
      coefOcupSuelo: { proyectado: '0.1622', permitido: '0.5' },
      supOcupSuelo:  { proyectado: '816.05', permitido: '2515.135' },
      coefConstr:    { proyectado: '2.7621', permitido: '3' },
      supConstr:     { proyectado: '13894.24', permitido: '15090.81' },
      distMin:       { proyectado: '6.77', permitido: '6.766' },
      antejardin:    { proyectado: '7', permitido: '7' },
      alturaMaxM:    { proyectado: '33.83', permitido: '35' },
      alturaMaxP:    { proyectado: '13', permitido: '13' },
      subdivPredial: { proyectado: '5030.27', permitido: '500' },
      dotacionEst:   { proyectado: '280', permitido: '281' },
      ocupSubsuelo:  { proyectado: '0.6087', permitido: '0.7' },
      supSubsuelo:   { proyectado: '3062.15', permitido: '3521.189' },
      rasantes:      { proyectado: 'ART.2.6.11 OGUC', permitido: '60°', cumple: 'SÍ' },
      agrupamiento:  { proyectado: 'AISLADO', permitido: 'AISL/PAREADO', cumple: 'SÍ' },
      adosamiento:   { proyectado: 'NO', permitido: 'ART.2.6.2 OGUC', cumple: 'SÍ' }
    },
    especiales: { fusionArt63: false, conjuntoArmonico: true, incrementoAltura: true, sombras: true }
  },
  alturas: {
    nEscalonesP1: '19', nEscalonesPt: '15', altEscalonP1: '0.17', altEscalonPt: '0.17',
    altCoronamiento: '0.5', nPisosTipo: '12', espesorLosa: '0.15', espesorPavP1: '0.02',
    espesorPavPt: '0.02', nptNivel1: '-0.5', altMaxProyectada: '33.83'
  },
  pisos: [
    { nivel: '-2', depto: '0', bodega: '92', local: '0', estVend: '110', estVis: '0', perimClim: '3062.15', poliComun: '3062.15', vacioAsc: '0', vacioEsc: '0', shaftComun: '0', shaftInt: '0', terrConstr: '0', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '272.36', otrasComercio: '0', radierCubierta: '3062.15' },
    { nivel: '-1', depto: '0', bodega: '77', local: '0', estVend: '108', estVis: '0', perimClim: '3062.15', poliComun: '3062.15', vacioAsc: '0', vacioEsc: '0', shaftComun: '0', shaftInt: '0', terrConstr: '0', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '214.99', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '1', depto: '0', bodega: '0', local: '5', estVend: '16', estVis: '46', perimClim: '820.05', poliComun: '620.45', vacioAsc: '0', vacioEsc: '0', shaftComun: '4', shaftInt: '0', terrConstr: '0', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '199.6', radierCubierta: '0' },
    { nivel: '2', depto: '18', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1285.99', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '7.2', terrConstr: '208.9', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '3', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '4', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '5', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '6', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '7', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '8', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '9', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '10', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '11', depto: '20', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1438.33', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '8', terrConstr: '240.34', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '12', depto: '16', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1133.66', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '6.4', terrConstr: '177.46', terrAzotea: '0', terrComunAzotea: '110.34', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: '13', depto: '16', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '1133.66', poliComun: '225.97', vacioAsc: '14.87', vacioEsc: '48.4', shaftComun: '4', shaftInt: '6.4', terrConstr: '177.46', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' },
    { nivel: 'SM', depto: '0', bodega: '0', local: '0', estVend: '0', estVis: '0', perimClim: '90.52', poliComun: '90.52', vacioAsc: '14.3', vacioEsc: '12.54', shaftComun: '0', shaftInt: '0', terrConstr: '0', terrAzotea: '0', terrComunAzotea: '0', terrMunicipal: '0', otrasBodega: '0', otrasComercio: '0', radierCubierta: '0' }
  ],
  productos: [
    { producto: 'DEPTO A',  programa: '3D-2B', utilUnidad: '75.77', nUnidades: '38' },
    { producto: 'DEPTO B1', programa: '2D-2B', utilUnidad: '54.15', nUnidades: '96' },
    { producto: 'DEPTO B2', programa: '2D-2B', utilUnidad: '59.04', nUnidades: '48' },
    { producto: 'DEPTO B3', programa: '2D-2B', utilUnidad: '61.81', nUnidades: '24' },
    { producto: 'DEPTO B4', programa: '2D-2B', utilUnidad: '54.15', nUnidades: '24' },
    { producto: 'LOCAL 1',  programa: 'COMERCIO', utilUnidad: '42.43', nUnidades: '1' },
    { producto: 'LOCAL 2',  programa: 'COMERCIO', utilUnidad: '36.5',  nUnidades: '1' },
    { producto: 'LOCAL 3',  programa: 'COMERCIO', utilUnidad: '42.09', nUnidades: '1' },
    { producto: 'LOCAL 4',  programa: 'COMERCIO', utilUnidad: '42.09', nUnidades: '1' },
    { producto: 'LOCAL 5',  programa: 'COMERCIO', utilUnidad: '36.5',  nUnidades: '1' }
  ],
  estocp: {
    est: { cantViviendas: '230', factorVisitas: '0.2', superficieComercio: '199.6',
           m2PorEstComercio: '40', estPorBici: '5', factorBiciVisitas: '0.1' },
    div: { est: 16, bodega: 40, comercio: 3, d60: 15, d140: 20, dmas: 30 },
    ocp: [
      { nivel: '-2', est: '1375', bodega: '272.36', comercio: '0', d60: '0', d140: '0', dmas: '0' },
      { nivel: '-1', est: '1350', bodega: '214.99', comercio: '0', d60: '0', d140: '0', dmas: '0' },
      { nivel: '1', est: '0', bodega: '0', comercio: '199.6', d60: '0', d140: '0', dmas: '0' },
      { nivel: '2', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '275.16', dmas: '0' },
      { nivel: '3', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '426.7', dmas: '0' },
      { nivel: '4', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '426.7', dmas: '0' },
      { nivel: '5', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '426.7', dmas: '0' },
      { nivel: '6', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '426.7', dmas: '0' },
      { nivel: '10', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '426.7', dmas: '0' },
      { nivel: '11', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '426.7', dmas: '0' },
      { nivel: '12', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '123.62', dmas: '0' },
      { nivel: '13', est: '0', bodega: '0', comercio: '0', d60: '777.66', d140: '123.62', dmas: '0' }
    ]
  }
};
