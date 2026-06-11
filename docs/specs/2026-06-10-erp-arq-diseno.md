# ERP-ARQ — Diseño del sistema de control de Anteproyectos

**Fecha:** 2026-06-10 · **Estado:** Borrador aprobado en lo esencial, en construcción iterativa.

## Contexto

La unidad de arquitectura controla sus anteproyectos con un Excel (`AAMMDD-01-BASE-AP.xlsx`)
de 7 hojas: TER, NOR, ALT, SUPxPISO, SUPxPRO, EST, OCP. ERP-ARQ reemplaza ese Excel con una
aplicación web donde cada anteproyecto es una **tarjeta que funciona como repositorio completo
del proyecto**, con visibilidad por roles.

## Hallazgo central del Excel

Las 3 dimensiones (Municipal, Construcción, Comercial) no son fichas distintas: son **3 lentes
calculadas sobre los mismos datos de entrada** (cuadros de SUPxPISO y SUPxPRO). Por lo tanto:

> Una fuente de verdad por proyecto + un motor de cálculo (`erp-calc.js`) + 3 vistas.

Los cuadros calculados NO se persisten en Firestore; se derivan en cliente, replicando 1:1 las
fórmulas del Excel, incluida la verificación cruzada SUPxPISO ↔ SUPxPRO (diferencia ≈ 0) como
chequeo de integridad.

## Stack

- HTML único por módulo, Vanilla JS, sin build system (patrón probado plataforma AGS).
- Firebase: proyecto `erp-arq` — Firestore + Auth (dominio `@agsnegocios.cl`) + Storage.
- SDK Firebase **compat** desde gstatic (consistencia con patrón AGS).
- Hosting: Netlify (se conecta el repo cuando exista el primer código funcional).

## Módulos

| Archivo | Función |
|---------|---------|
| `index.html` | Login + grilla de tarjetas de anteproyectos (filtros comuna/estado/búsqueda) |
| `proyecto.html?id=X` | La tarjeta / repo del proyecto: tabs Resumen, Terreno, Normativa, Alturas, Superficies (3 cuadros), Est/Ocp, Documentos, Bitácora |
| `admin.html` | Gestión de usuarios y roles (solo superadmin) |
| `firebase-init.js` | Init único con guard `window.__ERP_FIREBASE_INITIALIZED__` |
| `erp-helpers.js` | Namespace `ERP`: roles, estados, seed de usuarios, formateadores |
| `erp-calc.js` | Motor de cálculo (réplica de fórmulas Excel) — próxima fase |
| `erp-theme.css` | Tokens y componentes base |
| `firestore.rules` | Reglas de seguridad (pegar en consola Firebase) |

## Modelo Firestore

```
users/{email}            → name, email, role, active, createdAt
projects/{Date.now()}    → code (AAMMDD-NN), name, comuna, status, createdAt, createdBy,
                           terreno{lotes[]}, normativa{}, alturas{},
                           pisos[], productos[], estacionamientos{}, ocupacion{}
projects/.../documents/  → subcolección: metadata de archivos en Storage
projects/.../activity/   → subcolección: bitácora (quién, cuándo, qué)
```

Convenciones heredadas de AGS: IDs de proyecto `String(Date.now())`, fechas `YYYY-MM-DD`,
patrón Write-First con rollback, listeners onSnapshot con hash dedup.

## Roles

| Rol | Nivel | Ve / Edita |
|-----|-------|------------|
| `superadmin` | 5 | Todo + gestión de usuarios |
| `director` | 4 | Ve todo, edita todo |
| `arquitecto` | 3 | Edita todo lo técnico del proyecto |
| `municipal` | 2 | Terreno, Normativa, cuadro Municipal, Est/Ocp. NO ve cuadro Comercial |
| `construccion` | 2 | Cuadro Construcción, Alturas, Superficies. NO ve cuadro Comercial |
| `comercial` | 2 | Resumen, cuadro Comercial, tipologías. No edita lo técnico |
| `lectura` | 1 | Solo Resumen y documentos públicos |

Doble barrera: filtrado en UI **+ Firestore Security Rules** (la protección real es server-side).

### Usuarios iniciales (seed)

| Email | Rol |
|-------|-----|
| ccasanova@agsnegocios.cl | superadmin |
| fernando.colchero@agsnegocios.cl | director |

El seed se materializa al primer login de cada usuario (`ensureUserDoc`). Las security rules
solo permiten auto-provisionarse con el rol del seed (hardcodeado en rules) o como `lectura`.

## Estados del anteproyecto (borrador, a validar)

`estudio → desarrollo → ingresado (DOM) → observado ⇄ / aprobado → archivado`

## Pendientes de definición con el usuario

1. Validar ciclo de estados.
2. Normativa por comuna: por proyecto (como el Excel, fase 1) vs. biblioteca de zonas PRC (fase 2).
3. Migración de anteproyectos históricos desde Excel (¿importador?).
4. Roles definitivos del resto del equipo de la unidad.

## Fases

1. **F1 (actual):** fundación — login, seed usuarios, grilla, creación de anteproyectos, rules. Conectar Netlify.
2. **F2:** `proyecto.html` completo — tabs Terreno/Normativa/Alturas + persistencia.
3. **F3:** `erp-calc.js` — superficies por piso/producto, 3 cuadros, verificación cruzada, semáforos NOR.
4. **F4:** Est/Ocp, Documentos (Storage), Bitácora, admin.html.
5. **F5:** visibilidad fina por rol dentro de la tarjeta + rules granulares.
