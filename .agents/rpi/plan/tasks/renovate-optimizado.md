# Plan: Optimizar Renovate y retirar Dependabot

## Ruta
Delegated direct.

## Criterios de aceptación
- Renovate administra dependencias npm/pnpm y GitHub Actions; Dependabot queda retirado.
- Renovate asigna sus PRs a `yacosta738` y conserva el Dependency Dashboard.
- Agrupación limita ruido sin mezclar actualizaciones mayores con patch/minor.
- Auto-merge solo para actualizaciones patch/minor de bajo riesgo tras checks exitosos; majors y cambios sensibles quedan para revisión.
- Configuración validada con el esquema oficial de Renovate.
- Cambios locales existentes se preservan.

## Tareas
1. Confirmar versión vigente de configuración, managers y recomendaciones oficiales de Renovate.
2. Diseñar `renovate.json` con límites/schedules, dashboard, asignación, reglas de agrupación y auto-merge prudente.
3. Eliminar `.github/dependabot.yml` y validar que no haya otra configuración activa de Dependabot.
4. Validar JSON/schema y revisar diff final; actualizar asignaciones de PRs existentes de Renovate si aplican.
5. Registrar evidencia y riesgos.

## Evidencia inicial
- `renovate.json` solo extiende `config:recommended`.
- `.github/dependabot.yml` configura GitHub Actions mensual y npm semanal, ambas agrupadas globalmente.
- El usuario autorizó usar el `main` actual; PR #111 de deps permanece abierta, no se cierra en esta tarea.
- Worktree principal en `main` tiene cambios locales previos en imágenes y `.agents/`; preservarlos.

## Estado
Working — validar reglas recomendadas y editar configuración.
