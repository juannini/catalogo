# Catálogo Rick and Morty

**Alumno:** Juan Villagra

Catálogo de personajes hecho con React, Vite, React Router y Ant Design, con datos de una API pública.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Después abrí la URL que muestra la terminal (por defecto http://localhost:5173).

## API pública utilizada

[Rick and Morty API](https://rickandmortyapi.com/) — documentación: https://rickandmortyapi.com/documentation (no requiere API key).

## Endpoints consumidos

Base: `https://rickandmortyapi.com/api`

| Endpoint | Uso |
| --- | --- |
| `GET /character` | Listado de personajes en `/catalogo` |
| `GET /character/?name=rick` | Búsqueda por nombre (`/catalogo?buscar=rick`) |
| `GET /character/:id` | Detalle de un personaje en `/catalogo/:id` |

## Rutas

- `/` Home
- `/catalogo` Listado y buscador
- `/catalogo/:id` Detalle
- `*` Página 404
