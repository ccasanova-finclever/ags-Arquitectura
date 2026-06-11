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

  function today() { return new Date().toISOString().slice(0, 10); }

  // Código por convención de la unidad: AAMMDD (fecha) + correlativo
  function codePrefix() {
    const d = new Date();
    const p = x => String(x).padStart(2, '0');
    return String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate());
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---- Permisos -----------------------------------------------
  function roleLevel(user) { return user ? (ROLE_ORDER[user.role] || 0) : 0; }
  function canCreateProject(user) { return roleLevel(user) >= 3; }   // arquitecto+
  function canManageUsers(user) { return user && user.role === 'superadmin'; }
  function canSeeComercial(user) {
    return user && ['superadmin', 'director', 'arquitecto', 'comercial'].includes(user.role);
  }

  return {
    ROLE_ORDER, ROLE_META, STATUS_META, SEED_USERS, AUTH_DOMAIN,
    fmtNum, fmtM2, today, codePrefix, esc,
    roleLevel, canCreateProject, canManageUsers, canSeeComercial
  };
})();
