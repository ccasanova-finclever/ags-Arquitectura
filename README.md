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
4. Abrir la app, usar **"Crear cuenta"** con los correos del seed:
   - `ccasanova@agsnegocios.cl` → Super Administrador
   - `fernando.colchero@agsnegocios.cl` → Director
   El perfil con rol se crea automáticamente al primer login.

## Deploy

Conectar este repo a Netlify (publish directory: `.`, sin comando de build), o arrastrar
la carpeta a Netlify Drop.

## Estado de fases

- [x] **F1** Fundación: login, seed usuarios, grilla, creación de anteproyectos, rules.
- [ ] **F2** `proyecto.html`: tabs Terreno / Normativa / Alturas con persistencia.
- [ ] **F3** `erp-calc.js`: motor de cálculo (cuadros Municipal/Construcción/Comercial, verificación cruzada, semáforos).
- [ ] **F4** Est/Ocp, Documentos (Storage), Bitácora, `admin.html`.
- [ ] **F5** Visibilidad fina por rol dentro de la tarjeta + rules granulares.
