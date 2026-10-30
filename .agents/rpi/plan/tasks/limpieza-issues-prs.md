# Plan: Limpieza de issues y PRs abiertas

## Ruta
Delegated direct.

## Alcance autorizado
El usuario decidió consolidar en una sola PR todas las actualizaciones de dependencias abiertas, incluidas las mayores. Excluir PR #92 porque es configuración de Renovate, no una actualización de dependencia. Resolver duplicados (por ejemplo, #100/#101) eligiendo una sola propuesta; integrar cambios de PRs con fallos o conflictos solo si se pueden corregir y validar. No fusionar la PR agregada ni cerrar PRs originales hasta presentar el resultado y obtener autorización para esa acción remota. No modificar los cambios locales de imágenes.

## Tareas
1. Volver a consultar issues, PRs, checks, conflictos, descripciones y referencias cruzadas; registrar el inventario exacto.
2. Agrupar PRs de dependencias por seguridad, patch/minor, major, duplicados y bloqueos de CI.
3. Corregir únicamente fallos locales o de CI que tengan una causa comprobada y entren en el alcance autorizado; ejecutar verificaciones enfocadas.
4. Fusionar solo las PRs aprobadas por checks y seguras; cerrar únicamente duplicados/obsoletos confirmados, agregando explicación cuando corresponda.
5. Revaluar issues relacionadas después de las acciones de PR y cerrar las resueltas/duplicadas solo con evidencia.
6. Informar resultados, decisiones pendientes, riesgos y verificaciones ejecutadas.

## Evidencia inicial
- 8 issues abiertas y 17 PRs abiertas observadas el 2026-10-30.
- Estado local con cambios previos en imágenes: `public/ascii-bar-logo.png`, `public/ascii-bar-logo.jpeg`, `src/assets/ascii-bar-logo.dark.jpeg`, `src/assets/ascii-bar-logo.jpeg`; deben preservarse.
- CI de `main` mostró fallo de `Deploy Docs to GitHub Pages` en ejecuciones recientes; el log contiene aviso por input `cache` no admitido para `withastro/action@v4` y error de cache en post-step. Confirmar si es la causa bloqueante antes de modificar.
- Varias PRs mezclan actualizaciones mayores, obsoletas o fallos de validación; no se fusionarán por el solo hecho de ser dependencias.

## Estado
Working — inventario completo y verificación individual pendientes.
