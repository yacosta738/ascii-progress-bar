# Plan: Resolver issues abiertas

## Ruta
Delegated direct.

## Alcance autorizado
Corregir el workflow de limpieza de caché descrito en #84; cerrar #83, #91, #94, #97 y #98 con comentarios de resolución; dejar #95 y el Dependency Dashboard #47 abiertos. Preservar todos los cambios locales preexistentes.

## Tareas
- [x] RPI-001 Actualizar `.github/workflows/cleanup.yml` para usar `gh cache` integrado, permisos mínimos y entrada explícita para ejecución manual.
- [x] RPI-002 Validar sintaxis y comportamiento del workflow sin ejecutar borrado remoto de cachés.
- [x] RPI-003 Cerrar en GitHub #83, #91, #94, #97 y #98 con razón y referencias actuales.
- [x] RPI-004 Verificar estado final de issues y diff; registrar evidencia.

## Evidencia de verificación
- `actionlint .github/workflows/cleanup.yml`: pasó sin errores.
- `shellcheck -s bash` sobre el script del workflow: pasó sin errores.
- Parseo YAML con Ruby y `git diff --check`: pasaron.
- Issues #83, #91, #94, #97 y #98 cerradas con comentarios; #84, #95 y #47 quedan abiertas.
- No se eliminaron cachés ni se ejecutó el workflow en GitHub Actions.
- #84 sigue abierta hasta que el cambio del workflow se publique y se confirme su ejecución; no se publicó ni fusionó el cambio.

## Estado
Ready — workflow validado localmente; pendiente publicar el cambio y confirmar una ejecución antes de cerrar #84.

## Evidencia
- La configuración actual todavía instala `actions/gh-actions-cache` y usa `gh actions-cache`.
- La documentación oficial de GitHub recomienda `gh cache list --ref ... --json id` y `gh cache delete <id>`, con permiso `actions: write`.
- El checkout contiene cambios locales previos; no se modificarán salvo `.github/workflows/cleanup.yml` y este plan.

## Estado
Working — plan aprobado; actualización y cierre de issues pendientes.
