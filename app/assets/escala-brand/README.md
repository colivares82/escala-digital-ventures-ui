# Escala Digital Ventures — Brand assets (iteración 1)

Abre **`preview.html`** primero: es autocontenido y muestra cada asset sobre los tres fondos.

## Estructura

```
brand-assets/
  preview.html          ← hoja de contacto (abrir en navegador)
  manifest.json         ← dimensiones nativas y proporciones
  svg/                  ← vectores reales (solo símbolo e iconos)
  png/                  ← lockups y wordmarks con alfa
  webp/                 ← los mismos, sin pérdida
  icons/                ← favicon, apple-touch, maskable, símbolo suelto
```

## Nomenclatura

`{slug}-{color}[@2x].{png|webp}` — color ∈ `ink` · `paper` · `mar`

| Color | Hex | Se usa sobre |
|---|---|---|
| `ink` | `#16181D` | paper, blanco |
| `paper` | `#F7F7F4` | mar, abisal, ink, negro |
| `mar` | `#0E3A5D` | paper (variante de acento) |

## Assets

| ID | Slug | Nativo | Render @1x | Destino |
|---|---|---|---|---|
| L01 | `logo-01-seal` | 288 × 294 | 120 | Referencia, sellos |
| L02 | `logo-02-lockup` | 445 × 119 | 200 | Header |
| L03 | `escala-icon` (vector) | ∞ | — | Favicon, menú mobile |
| L04 | `logo-04-wordmark` | 352 × 45 | 160 | Uso libre |
| L05 | `logo-05-lockup-compact` | 386 × 64 | 180 | Footer |
| L06 | `logo-06-stacked` | 337 × 82 | 150 | Opción, espacios estrechos |

## Vectores disponibles

Solo el símbolo (tres barras) es vector real, reconstruido desde medición subpíxel:

- `escala-symbol-currentcolor.svg` — hereda el color por CSS, es el que conviene usar
- `escala-symbol-{ink|paper|mar}.svg`
- `escala-favicon.svg` / `escala-icon-circle-{ink|mar|paper}.svg` / `escala-icon-rounded-ink.svg` / `escala-icon-square-ink.svg`

Geometría normalizada (barra superior = 100): barras `100 / 73 / 49`, grosor `14`,
paso `30`, alto total `74`.

Los wordmarks (L01, L02, L04, L05, L06) contienen lettering y van como PNG/WebP.
El techo de resolución es el nativo de la tabla: no los escales por encima de `@2x`.

## Iconos

| Archivo | Uso |
|---|---|
| `favicon.ico` | 16/32/48/64 en un solo archivo |
| `favicon-{16,32,48,96,192,512}.png` | `<link rel="icon">` |
| `apple-touch-icon.png` | 180 px, a sangre (iOS aplica su propio redondeo) |
| `maskable-{192,512}.png` | manifest PWA, `purpose: maskable` |
| `symbol-{ink,paper,mar}-{48,96}.png` | símbolo suelto, sin disco |

En 16 y 32 px el símbolo se agranda dentro del disco (60 % en vez de 58 %) para que
las tres barras sigan siendo distinguibles.
