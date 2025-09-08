# Skandia Fiduciaria - Valorador de Facturas

Sistema de valoración de facturas para Skandia Fiduciaria, desarrollado con Angular 20 y PrimeNG.

## Características

- ✅ Autenticación con Azure MSAL
- ✅ Tema personalizado de Skandia
- ✅ Valorador de facturas con AG-Grid
- ✅ Dashboard con métricas
- ✅ Diseño responsive
- ✅ Modo oscuro/claro

## Development server

To start a local development server, run:

```bash
ng serve
```

Una vez que el servidor esté ejecutándose, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquier archivo fuente.

## Configuración de Azure MSAL

El proyecto está configurado para usar Azure Active Directory para autenticación. La configuración se encuentra en:
- `src/app/msal.config.ts`
- `src/app/auth/auth.service.ts`
- `src/app/auth/auth.guard.ts`

## Estructura del proyecto

```
src/
├── app/
│   ├── auth/                 # Servicios y guards de autenticación
│   ├── core/                 # Interfaces y tipos
│   ├── layout/               # Componentes de layout
│   ├── pages/                # Páginas de la aplicación
│   │   ├── dashboard/        # Dashboard principal
│   │   ├── invoice-valuator/ # Valorador de facturas
│   │   └── auth/            # Páginas de autenticación
│   └── shared/              # Componentes compartidos
├── assets/
│   ├── styles/              # Temas y estilos
│   └── layout/              # Estilos de layout
```

## Tema Skandia

El proyecto implementa el sistema de diseño de Skandia con:
- Paleta de colores oficial
- Tipografías Montserrat y Open Sans
- Componentes con estilo de marca
- Soporte para modo oscuro

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de construcción en el directorio `dist/`. Por defecto, la construcción de producción optimiza tu aplicación para rendimiento y velocidad.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI no viene con un framework de testing end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Tecnologías utilizadas

- **Angular 20** - Framework principal
- **PrimeNG 20** - Biblioteca de componentes UI
- **AG-Grid** - Grillas de datos avanzadas
- **Azure MSAL** - Autenticación con Microsoft
- **TailwindCSS** - Framework de CSS
- **ECharts** - Gráficos y visualizaciones
- **TypeScript** - Lenguaje de programación

## Additional Resources

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.
