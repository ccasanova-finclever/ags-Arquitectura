// ============================================================
// ERP-ARQ · Helpers compartidos (namespace ERP)
// ============================================================
window.ERP = (function () {

  // ---- Roles -------------------------------------------------
  const ROLE_ORDER = {
    superadmin: 5,
    director: 4,
    arquitecto: 3,
    municipal: 2,
    construccion: 2,
    comercial: 2,
    lectura: 1
  };

  const ROLE_META = {
    superadmin:  { l: 'Super Administrador', color: '#0F766E' },
    director:    { l: 'Director',            color: '#7C3AED' },
    arquitecto:  { l: 'Arquitecto',          color: '#2563EB' },
    municipal:   { l: 'Municipal',           color: '#D97706' },
    construccion:{ l: 'Construcción',        color: '#B45309' },
    comercial:   { l: 'Comercial',           color: '#DB2777' },
    lectura:     { l: 'Solo Lectura',        color: '#6B7280' }
  };

  // ---- Estados comerciales (venta del anteproyecto/proyecto) ---
  const COM_ESTADO = {
    no_disponible: { l: 'No disponible', color: '#6B7280', bg: '#F3F4F6' },
    disponible:    { l: 'Disponible',    color: '#16A34A', bg: '#DCFCE7' },
    ofrecido:      { l: 'Ofrecido',      color: '#D97706', bg: '#FEF3C7' },
    vendido:       { l: 'Vendido',       color: '#7C3AED', bg: '#EDE9FE' }
  };

  // ---- Tipos de negocio (columnas del Kanban comercial) --------
  const TIPO_NEGOCIO = {
    servicio:     { l: 'Servicios',     icon: '🔧', color: '#0F766E', bg: '#CCFBF1' },
    proyecto:     { l: 'Proyectos',     icon: '🏢', color: '#2563EB', bg: '#DBEAFE' },
    anteproyecto: { l: 'Anteproyectos', icon: '📐', color: '#7C3AED', bg: '#EDE9FE' }
  };
  const TIPO_NEGOCIO_ORDER = ['servicio', 'proyecto', 'anteproyecto'];

  // ---- Estado del negocio (etapa dentro de cada tarjeta) -------
  const ESTADO_NEGOCIO = {
    prospecto:   { l: 'Prospecto',         color: '#6B7280', bg: '#F3F4F6' },
    propuesta:   { l: 'Propuesta enviada', color: '#B45309', bg: '#FEF3C7' },
    evaluacion:  { l: 'En evaluación',     color: '#2563EB', bg: '#DBEAFE' },
    negociacion: { l: 'En negociación',    color: '#DB2777', bg: '#FCE7F3' },
    adjudicado:  { l: 'Adjudicado',        color: '#16A34A', bg: '#DCFCE7' },
    perdido:     { l: 'Perdido',           color: '#DC2626', bg: '#FEE2E2' }
  };
  const ESTADO_NEGOCIO_ORDER = ['prospecto', 'propuesta', 'evaluacion', 'negociacion', 'adjudicado', 'perdido'];

  // ---- Estados del anteproyecto -------------------------------
  const STATUS_META = {
    estudio:    { l: 'En Estudio',     color: '#F59E0B', bg: '#FEF3C7' },
    desarrollo: { l: 'En Desarrollo',  color: '#2563EB', bg: '#DBEAFE' },
    ingresado:  { l: 'Ingresado DOM',  color: '#7C3AED', bg: '#EDE9FE' },
    observado:  { l: 'Observado',      color: '#DC2626', bg: '#FEE2E2' },
    aprobado:   { l: 'Aprobado',       color: '#16A34A', bg: '#DCFCE7' },
    archivado:  { l: 'Archivado',      color: '#6B7280', bg: '#F3F4F6' }
  };

  // ---- Seed de usuarios (se materializa al primer login) ------
  // Las security rules solo permiten auto-provisionarse con el rol
  // del seed (hardcodeado en firestore.rules) o como 'lectura'.
  const SEED_USERS = {
    'ccasanova@agsnegocios.cl':         { name: 'Christian Casanova', role: 'superadmin' },
    'fernando.colchero@agsnegocios.cl': { name: 'Fernando Colchero',  role: 'director' }
  };

  const AUTH_DOMAIN = '@agsnegocios.cl';

  // ---- Formateadores ------------------------------------------
  function fmtNum(n, dec) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return Number(n).toLocaleString('es-CL', {
      minimumFractionDigits: dec || 0,
      maximumFractionDigits: dec === undefined ? 2 : dec
    });
  }

  function fmtM2(n) { return fmtNum(n, 2) + ' m²'; }

  // Pesos chilenos, sin decimales: $39.179.520
  function fmtCLP(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return '$' + Math.round(Number(n)).toLocaleString('es-CL');
  }

  // UF completa con punto de miles y coma decimal: UF 4.850,5
  function fmtUF(n) {
    if (n === null || n === undefined || n === '' || isNaN(n)) return '—';
    return 'UF ' + fmtNum(n, Number(n) % 1 === 0 ? 0 : 1);
  }

  // Valor de la UF del día (en pesos) SIEMPRE con 2 decimales: $39.179,52
  function fmtUFValor(n) {
    if (n === null || n === undefined || n === '' || isNaN(n)) return '—';
    return '$' + fmtNum(n, 2);
  }
  // Redondea el valor de la UF a 2 decimales al tomarla.
  function ufRound(n) {
    const v = Number(n);
    return isNaN(v) ? null : Math.round(v * 100) / 100;
  }

  function today() { return new Date().toISOString().slice(0, 10); }

  // Convención de código de la unidad: AANN + LLL
  //   AA  = últimos 2 dígitos del año en que el proyecto entró al servidor
  //   NN  = número correlativo de orden de entrada de proyectos ese año
  //   LLL = código de 3 letras de la ubicación física del terreno
  // Ejemplo: 2220UTE (año 2022, proyecto N°20, ubicación UTE).
  function yy() { return String(new Date().getFullYear()).slice(2); }

  function buildCode(year, num, loc) {
    const a = String(year || '').replace(/\D/g, '').slice(0, 2).padStart(2, '0');
    const n = String(num || '').replace(/\D/g, '').padStart(2, '0');
    const l = String(loc || '').toUpperCase().replace(/[^A-ZÑ]/g, '').slice(0, 3);
    return a + n + l;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---- Permisos -----------------------------------------------
  function roleLevel(user) { return user ? (ROLE_ORDER[user.role] || 0) : 0; }
  function canCreateProject(user) { return roleLevel(user) >= 3; }   // arquitecto+
  function canEditProject(user) { return roleLevel(user) >= 3; }     // arquitecto+ (coincide con firestore.rules)
  function canManageUsers(user) { return user && user.role === 'superadmin'; }
  function canSeeComercial(user) {
    return user && ['superadmin', 'director', 'arquitecto', 'comercial'].includes(user.role);
  }
  // Módulo comercial (precios y ventas): Comercial, Director, Super Admin.
  function canComercial(user) {
    return user && ['superadmin', 'director', 'comercial'].includes(user.role);
  }
  // Panel ejecutivo (ingresos del pipeline): Director, Super Admin.
  function canEjecutivo(user) {
    return user && ['superadmin', 'director'].includes(user.role);
  }

  // ---- Parsing numérico (acepta formato chileno o estándar) ----
  // Si hay coma, es decimal chileno: los puntos son miles → se quitan,
  // la coma pasa a punto. Si NO hay coma, el punto se trata como
  // separador decimal estándar (igual que los valores del Excel: 6.766).
  function parseNum(v) {
    if (v === null || v === undefined || v === '') return null;
    let s = String(v).trim();
    if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
    const n = Number(s);
    return isNaN(n) ? null : n;
  }

  // ---- Campos de un lote del terreno (hoja TER) ----------------
  const TER_LOTE_FIELDS = [
    { k: 'calle',     l: 'Calle',                 type: 'text' },
    { k: 'numero',    l: 'Número',                type: 'text' },
    { k: 'rolSII',    l: 'Rol SII',               type: 'text' },
    { k: 'zonaEdif',  l: 'Zona Edificación PRC',  type: 'text' },
    { k: 'zonaUso',   l: 'Zona Uso de Suelo PRC', type: 'text' },
    { k: 'cipN',      l: 'CIP N°',                type: 'text' },
    { k: 'cipFecha',  l: 'Fecha CIP',             type: 'date' },
    { k: 'supBruta',  l: 'Sup. Bruta Terreno',    type: 'num' },
    { k: 'supAUP',    l: 'Sup. AUP',              type: 'num' },
    { k: 'supNeta',   l: 'Sup. Neta Terreno',     type: 'num' }
  ];

  // ---- Parámetros normativos estándar (hoja NOR) ---------------
  // op: 'lte' = proyectado debe ser ≤ permitido (máximos);
  //     'gte' = proyectado debe ser ≥ permitido (mínimos exigidos);
  //     'manual' = cumplimiento se marca a mano (parámetros de texto).
  const NOR_PARAMS = [
    { k: 'densidadBruta',     l: 'Densidad Máxima Bruta',                         op: 'lte', u: 'hab/há' },
    { k: 'cantViviendas',     l: 'Cantidad Máxima de Viviendas',                  op: 'lte', u: 'viv' },
    { k: 'coefOcupSup',       l: 'Coef. Ocupación Pisos Superiores (Residencial)', op: 'lte', u: '' },
    { k: 'supOcupSup',        l: 'Máx. Superficie Ocupación Pisos Superiores',    op: 'lte', u: 'm²' },
    { k: 'coefOcupSuelo',     l: 'Coef. Ocupación de Suelo (Residencial)',        op: 'lte', u: '' },
    { k: 'supOcupSuelo',      l: 'Máx. Superficie Ocupación de Suelo',            op: 'lte', u: 'm²' },
    { k: 'coefConstr',        l: 'Coef. de Constructibilidad',                    op: 'lte', u: '' },
    { k: 'supConstr',         l: 'Máx. Superficie Constructibilidad',             op: 'lte', u: 'm²' },
    { k: 'distMin',           l: 'Distanciamiento Mínimo Art.2.6.12 OGUC',        op: 'gte', u: 'm' },
    { k: 'antejardin',        l: 'Antejardín Mínimo',                             op: 'gte', u: 'm' },
    { k: 'alturaMaxM',        l: 'Altura Máxima (metros)',                        op: 'lte', u: 'm' },
    { k: 'alturaMaxP',        l: 'Altura Máxima (pisos)',                         op: 'lte', u: 'pisos' },
    { k: 'subdivPredial',     l: 'Subdivisión Predial Mínima',                    op: 'gte', u: 'm²' },
    { k: 'dotacionEst',       l: 'Dotación Mínima Estacionamientos',              op: 'gte', u: 'est' },
    { k: 'ocupSubsuelo',      l: '% Máximo Ocupación Subsuelo',                   op: 'lte', u: '' },
    { k: 'supSubsuelo',       l: 'Superficie Máxima Ocupación Subsuelo',          op: 'lte', u: 'm²' },
    { k: 'rasantes',          l: 'Rasantes',                                      op: 'manual', u: '' },
    { k: 'agrupamiento',      l: 'Sistema de Agrupamiento',                       op: 'manual', u: '' },
    { k: 'adosamiento',       l: 'Adosamiento',                                   op: 'manual', u: '' }
  ];

  // ---- Campos de Alturas (hoja ALT, datos a ingresar) ----------
  const ALT_FIELDS = [
    { k: 'nEscalonesP1',    l: 'N° Escalones Piso 1',          type: 'num' },
    { k: 'nEscalonesPt',    l: 'N° Escalones Piso Tipo',       type: 'num' },
    { k: 'altEscalonP1',    l: 'Altura Escalón Piso 1',        type: 'num' },
    { k: 'altEscalonPt',    l: 'Altura Escalón Piso Tipo',     type: 'num' },
    { k: 'altCoronamiento', l: 'Altura Coronamiento',          type: 'num' },
    { k: 'nPisosTipo',      l: 'N° Pisos Tipo',                type: 'num' },
    { k: 'espesorLosa',     l: 'Espesor Losa',                 type: 'num' },
    { k: 'espesorPavP1',    l: 'Espesor Pavimento Piso 1',     type: 'num' },
    { k: 'espesorPavPt',    l: 'Espesor Pavimento Piso Tipo',  type: 'num' },
    { k: 'nptNivel1',       l: 'NPT Nivel 1',                  type: 'num' },
    { k: 'altMaxProyectada',l: 'Altura Máxima Proyectada',     type: 'num' }
  ];

  // ---- Campos de entrada por nivel (hoja SUPxPISO) -------------
  // g = grupo de encabezado para la tabla.
  const SUP_FIELDS = [
    { k: 'depto',           l: 'Deptos',          g: 'N° Unidades' },
    { k: 'bodega',          l: 'Bodegas',         g: 'N° Unidades' },
    { k: 'local',           l: 'Locales',         g: 'N° Unidades' },
    { k: 'estVend',         l: 'Est. Vend.',      g: 'N° Unidades' },
    { k: 'estVis',          l: 'Est. Visitas',    g: 'N° Unidades' },
    { k: 'perimClim',       l: 'Perím. Climat.',  g: 'Superficies (m²)' },
    { k: 'poliComun',       l: 'Polilínea Común', g: 'Superficies (m²)' },
    { k: 'vacioAsc',        l: 'Vacío Ascensor',  g: 'Vacíos (m²)' },
    { k: 'vacioEsc',        l: 'Vacío Escalera',  g: 'Vacíos (m²)' },
    { k: 'shaftComun',      l: 'Shaft Común',     g: 'Vacíos (m²)' },
    { k: 'shaftInt',        l: 'Shaft Interior',  g: 'Vacíos (m²)' },
    { k: 'terrConstr',      l: 'Terr. Constr.',   g: 'Terrazas (m²)' },
    { k: 'terrAzotea',      l: 'Terr. Azotea',    g: 'Terrazas (m²)' },
    { k: 'terrComunAzotea', l: 'Terr. Común Az.', g: 'Terrazas (m²)' },
    { k: 'terrMunicipal',   l: 'Terr. Municipal', g: 'Terrazas (m²)' },
    { k: 'otrasBodega',     l: 'Bodegas',         g: 'Otras Sup. (m²)' },
    { k: 'otrasComercio',   l: 'Comercio',        g: 'Otras Sup. (m²)' },
    { k: 'radierCubierta',  l: 'Radier/Cubierta', g: 'Otras Sup. (m²)' }
  ];

  // Evalúa cumplimiento de un parámetro normativo.
  // Devuelve true / false / null (sin datos suficientes).
  function cumpleEval(op, proyectado, permitido) {
    if (op === 'manual') return null;
    const a = parseNum(proyectado), b = parseNum(permitido);
    if (a === null || b === null) return null;
    if (op === 'lte') return a <= b + 1e-6;
    if (op === 'gte') return a >= b - 1e-6;
    return null;
  }

  return {
    ROLE_ORDER, ROLE_META, STATUS_META, COM_ESTADO, SEED_USERS, AUTH_DOMAIN,
    TIPO_NEGOCIO, TIPO_NEGOCIO_ORDER, ESTADO_NEGOCIO, ESTADO_NEGOCIO_ORDER,
    TER_LOTE_FIELDS, NOR_PARAMS, ALT_FIELDS, SUP_FIELDS,
    fmtNum, fmtM2, fmtCLP, fmtUF, fmtUFValor, ufRound, today, yy, buildCode, esc, parseNum, cumpleEval,
    roleLevel, canCreateProject, canEditProject, canManageUsers, canSeeComercial, canComercial, canEjecutivo
  };
})();
