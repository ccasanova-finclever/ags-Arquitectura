// ============================================================
// ERP-ARQ · Motor de cálculo de superficies (réplica del Excel)
// ----------------------------------------------------------------
// Replica las fórmulas de la hoja SUPxPISO: a partir de los datos
// de entrada por nivel deriva los 3 cuadros — Municipal, Construcción
// y Comercial — más sus totales. Validado contra los valores reales
// del Excel base (ver erp-calc.test.js).
//
// Stacking: `levels` debe venir ordenado de ABAJO hacia ARRIBA
// (subterráneos primero, luego pisos, SM al final). La losa de cada
// nivel modela el cielo que soporta el piso inmediatamente superior,
// por eso varias fórmulas referencian el nivel `i+1`.
//
// Campos de entrada por nivel (todos numéricos salvo `nivel`):
//   nivel, depto, bodega, local, estVend, estVis,
//   perimClim (H), poliComun (I),
//   vacioAsc (J), vacioEsc (K), shaftComun (L), shaftInt (M),
//   terrConstr (N), terrAzotea (O), terrComunAzotea (P), terrMunicipal (Q),
//   otrasBodega (R), otrasComercio (S), radierCubierta (T)
// ============================================================
(function (root) {

  const AREA_EST = 2.5 * 5; // 12.5 m² por estacionamiento (subterráneo)

  function num(v) {
    if (v === null || v === undefined || v === '') return 0;
    if (typeof v === 'number') return v;
    let s = String(v).trim();
    if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
    const n = Number(s);
    return isNaN(n) ? 0 : n;
  }

  function isSubte(lvl) {
    const n = typeof lvl.nivel === 'number' ? lvl.nivel : parseFloat(lvl.nivel);
    return !isNaN(n) && n < 0;
  }
  function isPisoUno(lvl) {
    return (typeof lvl.nivel === 'number' ? lvl.nivel : parseFloat(lvl.nivel)) === 1;
  }

  // Normaliza un registro de nivel a sus campos numéricos (H, I, …).
  function norm(lvl) {
    return {
      nivel: lvl.nivel,
      depto: num(lvl.depto), bodega: num(lvl.bodega), local: num(lvl.local),
      estVend: num(lvl.estVend), estVis: num(lvl.estVis),
      H: num(lvl.perimClim), I: num(lvl.poliComun),
      J: num(lvl.vacioAsc), K: num(lvl.vacioEsc), L: num(lvl.shaftComun), M: num(lvl.shaftInt),
      N: num(lvl.terrConstr), O: num(lvl.terrAzotea), P: num(lvl.terrComunAzotea), Q: num(lvl.terrMunicipal),
      R: num(lvl.otrasBodega), S: num(lvl.otrasComercio), T: num(lvl.radierCubierta),
      _subte: isSubte(lvl), _pisoUno: isPisoUno(lvl)
    };
  }

  const ZERO = { H:0,I:0,J:0,K:0,L:0,M:0,N:0,O:0,P:0,Q:0,R:0,S:0,T:0,_subte:false };

  // ---- Cuadro MUNICIPAL (fórmulas de misma fila) ----------------
  function municipal(L) {
    const AF = L.H - (L.J + L.K + L.L + L.M) + L.Q;        // total
    const Y = L.S;                                          // útil comercio
    const Z = L.R;                                          // bodegas
    const AA = L._subte ? L.estVend * AREA_EST : 0;         // estacionamientos
    const AE = L._subte ? (AF - Z - AA - Y) : (L.I - (L.J + L.K + L.L)); // común
    const AD = AF - AE;                                     // útil
    const X = L.depto > 0 ? AD : 0;                         // útil deptos
    const AB = L.O;                                         // uso y goce exclusivo
    const AC = AE - AB;                                     // uso común
    return { X, Y, Z, AA, AB, AC, AD, AE, AF };
  }

  // ---- Cuadro CONSTRUCCIÓN (losa referencia el nivel de arriba) --
  function construccion(L, above) {
    const a = above || ZERO;
    const AI = a.H - a.I;                                   // interior útil
    let AJ, AK;
    if (a._subte) { AJ = 0; AK = a.H; }                    // si el de arriba es subte → interior subte
    else { AJ = a.I; AK = 0; }                              // si no → interior común
    const AL = a.N + a.O;                                   // exterior útil terrazas
    const AM = a.P;                                         // exterior común terrazas
    let AN = Math.max((L.H + L.N + L.O) - (a.H + a.N + a.O + a.P), 0); // cubiertas
    if (!L._subte) AN += L.T;                               // cubierta extra (piso 1)
    const AO = AI + AJ + AK + AL + AM + AN;                 // total losa
    const AP = L._subte ? L.T : 0;                          // radier (losa sobre suelo)
    const AQ = AO + AP;                                     // total construido
    return { AI, AJ, AK, AL, AM, AN, AO, AP, AQ };
  }

  // ---- Cuadro COMERCIAL (misma fila; AZ referencia muni Z y AA) --
  function comercial(L, muni) {
    const AT = L.depto > 0 ? (L.H === 0 ? 0 : L.H - L.I) : 0;  // útil interior deptos
    const AU = L.N / 2;                                         // útil terraza deptos (50%)
    const AV = L.O / 4;                                         // útil jardín/azotea (25%)
    const AW = L.S;                                             // útil comercio
    const AX = AT + AU + AV + AW;                              // útil total
    const AY = L.R;                                            // bodegas
    const AZ = L.H === 0 ? 0 : (L._subte ? (L.I - muni.Z - muni.AA) : L.I); // común uso común
    return { AT, AU, AV, AW, AX, AY, AZ };
  }

  // ---- Cómputo completo -----------------------------------------
  function computeSurfaces(levels) {
    const norms = (levels || []).map(norm);
    const out = norms.map((L, i) => {
      const above = norms[i + 1] || ZERO;
      const M = municipal(L);
      const C = construccion(L, above);
      const K = comercial(L, M);
      return { nivel: L.nivel, depto: L.depto, bodega: L.bodega, local: L.local,
               estVend: L.estVend, estVis: L.estVis, muni: M, constr: C, com: K };
    });

    // Totales
    const T = {
      muni: { X:0,Y:0,Z:0,AA:0,AB:0,AC:0,AD:0,AE:0,AF:0 },
      constr: { AI:0,AJ:0,AK:0,AL:0,AM:0,AN:0,AO:0,AP:0,AQ:0 },
      com: { AT:0,AU:0,AV:0,AW:0,AX:0,AY:0,AZ:0 },
      unidades: { depto:0, bodega:0, local:0, estVend:0, estVis:0 }
    };
    out.forEach(r => {
      for (const k in T.muni) T.muni[k] += r.muni[k];
      for (const k in T.constr) T.constr[k] += r.constr[k];
      for (const k in T.com) T.com[k] += r.com[k];
      T.unidades.depto += num(r.depto); T.unidades.bodega += num(r.bodega);
      T.unidades.local += num(r.local); T.unidades.estVend += num(r.estVend);
      T.unidades.estVis += num(r.estVis);
    });
    return { levels: out, totals: T };
  }

  // ---- Carga de ocupación (hoja OCP) ----------------------------
  // Divisores HAB/m² por destino (editables por comuna; default OGUC).
  const OCP_DIV = { est: 16, bodega: 40, comercio: 3, d60: 15, d140: 20, dmas: 30 };

  function computeOcupacion(rows, div) {
    const d = Object.assign({}, OCP_DIV, div || {});
    const levels = (rows || []).map(r => {
      const carga = Math.round(
        num(r.est) / d.est + num(r.bodega) / d.bodega + num(r.comercio) / d.comercio +
        num(r.d60) / d.d60 + num(r.d140) / d.d140 + num(r.dmas) / d.dmas
      );
      return { nivel: r.nivel, carga };
    });
    const total = levels.reduce((s, l) => s + l.carga, 0);
    return { levels, total, div: d };
  }

  // ---- Dotación de estacionamientos (hoja EST) ------------------
  // Parámetros editables por comuna; defaults del Excel base.
  const EST_DEFAULTS = {
    cantViviendas: 0, factorVisitas: 0.2, superficieComercio: 0,
    m2PorEstComercio: 40, estPorBici: 5, factorBiciVisitas: 0.1
  };

  function computeEstacionamientos(p) {
    const q = Object.assign({}, EST_DEFAULTS, p || {});
    const vendiblesVivienda = Math.ceil(num(q.cantViviendas));            // 1 est/viv <100m²
    const visitas = Math.ceil(num(q.factorVisitas) * vendiblesVivienda);
    const totalVivienda = vendiblesVivienda + visitas;
    const comercio = q.m2PorEstComercio > 0 ? Math.ceil(num(q.superficieComercio) / q.m2PorEstComercio) : 0;
    const totalVehiculos = vendiblesVivienda + visitas + comercio;
    const biciBase = q.estPorBici > 0 ? Math.ceil(totalVehiculos / q.estPorBici) : 0;
    const biciVisitas = Math.ceil(biciBase * num(q.factorBiciVisitas));
    const totalBicicletas = biciBase + biciVisitas;
    return { vendiblesVivienda, visitas, totalVivienda, comercio, totalVehiculos,
             biciBase, biciVisitas, totalBicicletas };
  }

  // Redondeo a 2 decimales para comparación/visualización.
  function r2(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }

  const API = { computeSurfaces, municipal, construccion, comercial,
                computeOcupacion, computeEstacionamientos, OCP_DIV, EST_DEFAULTS,
                num, r2, AREA_EST };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.ERPCalc = API;

})(typeof window !== 'undefined' ? window : this);
