# Contextual Experience Playbook

> **Diseña interfaces que respondan al contexto.**  
> Convierte señales del usuario en decisiones de interfaz que puedan explicarse, probarse y medirse.

El **Contextual Experience Playbook** es una herramienta de trabajo interactiva, responsive y usable diseñada para product designers, investigadores UX y equipos de producto. Permite formular y validar hipótesis contextuales bajo el marco:

$$\text{SEÑAL} \longrightarrow \text{CONTEXTO} \longrightarrow \text{INTENCIÓN} \longrightarrow \text{DECISIÓN} \longrightarrow \text{RESPUESTA} \longrightarrow \text{EVIDENCIA}$$

---

## Características Principales

- **Constructor de Hipótesis Progresivo (Wizard 6 etapas)**:
  - Paso 1: **Señal** (13 tipos de señal, observaciones y asignación de nivel de evidencia).
  - Paso 2: **Contexto** (Arquetipos de situación, descripción y confianza).
  - Paso 3: **Intención** (Constructor de Job To Be Done: *Cuando... quiero... para poder...*).
  - Paso 4: **Decisión** (No intervenir, Acompañar, Adaptar + Costo de error y advertencias).
  - Paso 5: **Respuesta** (8 patrones contextuales y comparador Antes/Después).
  - Paso 6: **Evidencia** (Outcomes, métricas de éxito, métodos de validación y nivel de madurez).
- **Contextual Hypothesis Card**: Formato sintético y exportable (Markdown, JSON, Imprimir/PDF) con plan de prototipado rápido.
- **Playbook Metodológico**: Documentación modular (Mintlify/Slite) con principios, callouts, do/don'ts y checklists.
- **Biblioteca de Patrones**: Catálogo de 8 patrones (Priorizar, Simplificar, Orientar, Prevenir, Recuperar, Recordar, Continuar, Confirmar) con filtros interactivos.
- **Niveles de Evidencia**: Marco de 3 niveles (Nivel 1: Existente, Nivel 2: Aproximada, Nivel 3: Hipótesis) y matriz de decisión.
- **Madurez Contextual**: Visualización de 5 niveles (M0 a M4) con evaluador interactivo *"¿Qué nivel necesita mi caso?"*.
- **Medición & Experimentos**: Catálogo de métricas y generador interactivo de enunciados falsables.
- **Persistencia Local**: Almacenamiento en `localStorage` con soporte CRUD, borradores automáticos y 5 casos reales de demostración precargados.

---

## Tecnologías Utilizadas

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS** (Tokens semánticos, diseño editorial, modo responsive mobile-first)
- **Lucide Icons**

---

## Instalación y Ejecución Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
