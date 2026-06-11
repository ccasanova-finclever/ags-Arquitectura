# ERP-ARQ · Control de Anteproyectos

Sistema web para la unidad de arquitectura: cada anteproyecto es una tarjeta que funciona
como repositorio completo del proyecto (terreno, normativa, alturas, superficies en sus
3 dimensiones — Municipal, Construcción, Comercial —, estacionamientos, ocupación,
documentos y bitácora), con visibilidad por roles.

Diseño completo: [docs/specs/2026-06-10-erp-arq-diseno.md](docs/specs/2026-06-10-erp-arq-diseno.md)

## Stack

- HTML + Vanilla JS, sin build system.
- Firebase (proyecto `erp-arq`): Firestore + Auth + Storage.
- Hosting: Netlify.

## Puesta en marcha (una sola vez, en la consola Firebase)

1. **Authentication → Sign-in method**: habilitar **Correo electrónico/contraseña**.
2. **Firestore Database**: crear la base de datos (modo producción).
3. **Firestore → Reglas**: pegar el contenido de [`firestore.rules`](firestore.rules) y publicar.
4. **Storage**: crear el bucket y en **Storage → Reglas** pegar [`storage.rules`](storage.rules)
   (necesario para la pestaña Documentos).
5. Abrir la app, usar **"Crear cuenta"** con los correos del seed:
   - `ccasanova@agsnegocios.cl` → Super Administrador
   - `fernando.colchero@agsnegocios.cl` → Director
   El perfil con rol se crea automáticamente al primer login.
6. El resto del equipo se registra con su correo `@agsnegocios.cl` (entran como
   **Solo Lectura**); el Super Administrador les asigna el rol desde **⚙︎ Admin**.

## Deploy

Conectar este repo a Netlify (publish directory: `.`, sin comando de build), o arrastrar
la carpeta a Netlify Drop.

## Estado de fases

- [x] **F1** Fundación: login, seed usuarios, grilla, creación de anteproyectos, rules.
- [x] **F2** `proyecto.html`: tabs Terreno / Normativa / Alturas con persistencia Write-First.
      Normativa ya evalúa cumplimiento (proyectado vs. permitido) con semáforo en vivo.
- [x] **F3** `erp-calc.js`: motor de cálculo de superficies por nivel → cuadros
      Municipal / Construcción / Comercial con totales en vivo. Validado contra los
      16 totales reales del Excel (`node erp-calc.test.js`). Pestaña Superficies con
      tabla de entrada por nivel + cuadros según rol.
- [x] **F3b** Cuadro "Superficies por producto" + verificación cruzada con SUPxPISO
      + botón para derivar el "proyectado" de Normativa desde las superficies.
- [x] **F4** Est/Ocupación (validado: 281 est, 870 ocupación), Documentos (Storage),
      Bitácora (subcolección activity), `admin.html` (gestión de usuarios/roles).
- [x] **F5** Visibilidad fina por rol (tabs y cuadros por área), bloqueo de usuarios
      inactivos, `storage.rules`. Verificado por rol con harness de integración.

**El sistema está funcionalmente completo.** Próximas mejoras opcionales: biblioteca de
zonas PRC por comuna, importador de anteproyectos históricos desde Excel, y estudio de
sombras/rampas/volúmenes (hoja ALT ampliada).
