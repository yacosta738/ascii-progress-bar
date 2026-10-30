# Tarea: Corregir instalación en PR #121

## Ruta
Delegated direct.

## Criterios de aceptación
- La instalación de dependencias no ejecuta `tsup` antes de instalar las dependencias del workspace.
- El job de validación pasa la instalación y ejecuta los tests, si no aparecen fallos independientes.
- El fallo del artefacto de Renovate se resuelve sin debilitar la política `minimumReleaseAge`.
- Los cambios locales preexistentes se preservan.

## Tareas
1. Aislar cambios de código en un worktree basado en la rama de PR #121.
2. Cambiar `preinstall` para que solo valide el gestor de paquetes y mantener la compilación en los flujos explícitos existentes.
3. Validar el JSON y probar instalación/build/tests en alcance focalizado.
4. Inspeccionar elegibilidad temporal de las versiones rechazadas por Renovate y, si ya maduraron, reintentar/regenerar el lockfile sin reducir la política.

## Evidencia
- PR #121 usa `pnpm@12.16.1`, versión más reciente verificada.
- `preinstall` ejecuta `pnpm run build:packages`; `packages/ascii-progress-bar` compila con `tsup` declarado en `devDependencies`.
- El artefacto de Renovate rechazó cinco paquetes por `minimumReleaseAge`; fallo separado del job `validate`.
- `.agents/rpi/plan/tasks/` existe; `plan/tasks/` no existe.
- El checkout principal tiene cambios locales preexistentes que deben preservarse.

## Cambios
- `package.json`: `preinstall` ahora solo valida pnpm; la compilación permanece en los comandos explícitos de build/dev.
- `pnpm-workspace.yaml`: autoriza el script de build de `esbuild`, requerido por pnpm 12 para la instalación de dependencias.
- `pnpm-lock.yaml`: actualizado al formato/metadatos de pnpm 12 para que `pnpm install --frozen-lockfile` acepte la configuración actual.
- La política `minimumReleaseAge` no se redujo. El error de Renovate es temporal y requiere reintentar cuando las versiones rechazadas superen la ventana de antigüedad.

## Evidencia
- `pnpm install --frozen-lockfile`: pasa con pnpm 12.16.1.
- `pnpm run preinstall`: pasa sin lanzar `build:packages`.
- `pnpm run build:packages`: pasa; compila paquete con tsup.
- `pnpm --filter @yacosta738/ascii-progress-bar test`: 2 suites y 20 tests pasan.
- `pnpm run check`: 0 errores, 0 warnings y 2 hints.
- `pnpm run build`: pasa; muestra advertencias existentes por la colección de i18n ausente.
- `git diff --check` y validación JSON de `package.json`: pasan.
- La instalación local con política de supply-chain habilitada valida 834 entradas del lockfile; no se debilita la política Renovate.

## Estado
CI detectó que ocho versiones del lockfile no cumplen el mínimo predeterminado de antigüedad de 24 horas de pnpm. Mi entorno local tenía `minimumReleaseAge: 0` globalmente, por eso la verificación local anterior no reprodujo el bloqueo. Se regenerará el lockfile bajo la ventana de 1440 minutos; no se reducirá la protección.