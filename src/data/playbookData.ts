export interface PlaybookChapter {
  id: string;
  title: string;
  badge: string;
  summary: string;
  sections: {
    title: string;
    content: string;
    callout?: {
      type: 'tip' | 'warning' | 'info';
      title: string;
      text: string;
    };
    doDont?: {
      doText: string;
      dontText: string;
    };
    checklist?: string[];
    exampleBox?: {
      title: string;
      situation: string;
      resolution: string;
    };
  }[];
}

export const PLAYBOOK_CHAPTERS: PlaybookChapter[] = [
  {
    id: 'que-es-interfaz-contextual',
    title: 'Qué es una interfaz contextual',
    badge: 'Fundamentos',
    summary: 'Una interfaz contextual es aquella que adapta su presentación, contenido o asistencia basándose en señales detectadas del usuario, su entorno o el momento del journey, manteniendo la autonomía y la explicabilidad.',
    sections: [
      {
        title: 'Más allá de la personalización cosmética',
        content: 'Personalizar no es poner el nombre del usuario en el saludo de bienvenida ni forzar algoritmos opacos. El diseño contextual busca responder una pregunta pragmática en tiempo de diseño: ¿Qué necesita este usuario en este instante exacto para resolver su tarea con menor fricción y mayor seguridad?'
      },
      {
        title: 'El bucle de intervención contextual',
        content: 'El framework estructura cada oportunidad en seis eslabones encadenados. Si alguno falta, la propuesta se convierte en mera suposición intuitiva sin sustento técnico ni métrico.',
        callout: {
          type: 'info',
          title: 'La fórmula central',
          text: 'SEÑAL (¿Qué ocurre?) → CONTEXTO (¿Qué inferimos?) → INTENCIÓN (¿Qué busca el usuario?) → DECISIÓN (¿Intervenimos?) → RESPUESTA (¿Cómo cambia la interfaz?) → EVIDENCIA (¿Cómo medimos el éxito?).'
        }
      },
      {
        title: 'Autonomía sobre automatismo ciego',
        content: 'Una buena interfaz contextual propone atajos y reduce ruido, pero jamás secuestra la voluntad del usuario ni esconde caminos principales sin permitir escape.',
        doDont: {
          doText: 'Ofrecer una sugerencia contextual visible pero fácilmente descartable con 1 toque.',
          dontText: 'Modificar drásticamente la pantalla sin explicación ni posibilidad de volver al estado habitual.'
        }
      }
    ]
  },
  {
    id: 'principios',
    title: 'Principios de diseño contextual',
    badge: 'Guía de diseño',
    summary: 'Siete principios no negociables que todo equipo de producto debe aplicar antes de implementar una lógica contextual en sus interfaces.',
    sections: [
      {
        title: '1. Contexto ≠ Certeza',
        content: 'Toda inferencia de contexto tiene un margen de error. Cuanto más compleja sea la interpretación, menor debe ser la agresividad de la intervención de interfaz.'
      },
      {
        title: '2. Reversibilidad garantizada',
        content: 'Si el sistema se equivoca al predecir la necesidad del usuario, el costo de corregir debe ser cercano a cero segundos. El usuario siempre debe poder decir "No es lo que busco".',
        checklist: [
          '¿Existe un botón o mecanismo claro para ver la interfaz estándar?',
          '¿Se conservan los datos previos si el usuario descarta la sugerencia?',
          '¿La interfaz explica por qué está mostrando esa opción?'
        ]
      },
      {
        title: '3. Evidencia proporcional al impacto',
        content: 'Para sugerir un filtro de búsqueda basta una heurística (Nivel 3). Para reorganizar un menú de transacciones bancarias se requiere analítica robusta y validación controlada (Nivel 1).',
        callout: {
          type: 'warning',
          title: 'Regla de oro',
          text: 'Nunca adaptes una interfaz crítica basándote exclusivamente en intuiciones no validadas.'
        }
      },
      {
        title: '4. Transparencia y explicabilidad',
        content: 'El usuario no debe sentir que la aplicación "hace magia negra". Un microcopy claro como "Basado en tus transferencias habituales de fin de mes" genera confianza instantánea.',
        doDont: {
          doText: 'Decir: "Te sugerimos esta dirección porque la usaste en tus últimos 3 envíos".',
          dontText: 'Cambiar la dirección automáticamente en silencio sin notificar al usuario.'
        }
      }
    ]
  },
  {
    id: 'senal',
    title: 'Paso 1: La Señal',
    badge: 'Framework',
    summary: 'La señal es el disparador objetivo y medible que activa la hipótesis contextual en el sistema.',
    sections: [
      {
        title: '¿Qué cuenta como una señal válida?',
        content: 'Una señal no es un deseo del diseñador ("queremos que compren más"). Una señal es un dato observable en el comportamiento del usuario, el sistema o el entorno.',
        checklist: [
          'Errores repetidos (ej. 3 fallos de autenticación o validación de tarjeta)',
          'Tiempo de inactividad o vacilación prolongada en un paso crítico',
          'Patrón de abandono recurrente en un paso del embudo',
          'Historial de compras o transacciones periódicas consolidadas',
          'Búsquedas internas que terminan con cero resultados',
          'Parámetros del contexto (tipo de dispositivo, horario, ubicación)'
        ]
      },
      {
        title: 'Fuentes y niveles de señal',
        content: 'Clasificar la fuente de la señal asigna inmediatamente el nivel de evidencia del caso: analítica y logs otorgan Nivel 1; heurísticas y research cualitativo otorgan Nivel 2; hipótesis puras otorgan Nivel 3.',
        exampleBox: {
          title: 'Ejemplo de señal en checkout',
          situation: 'El 18% de usuarios que intentan pagar con tarjeta de crédito reciben el error "Código de seguridad inválido" al menos dos veces consecutivas.',
          resolution: 'Señal registrada: Error repetido (tipo: Formulario de pago, fuente: Logs de transacciones, Nivel 1).'
        }
      }
    ]
  },
  {
    id: 'contexto',
    title: 'Paso 2: El Contexto',
    badge: 'Framework',
    summary: 'El contexto es la hipótesis explicativa sobre qué situación real está experimentando el usuario detrás de la señal.',
    sections: [
      {
        title: 'De la observación a la inferencia',
        content: 'Una señal solo dice "qué pasó". El contexto aventura "por qué podría estar pasando". Por ejemplo, ver que alguien pasa 2 minutos en una pantalla puede significar que está leyendo con atención o que está totalmente confundido.',
        callout: {
          type: 'tip',
          title: 'El mantra del diseñador contextual',
          text: '"Contexto ≠ certeza". Siempre asigna un nivel de confianza (Baja, Media o Alta) a tu interpretación antes de decidir qué hacer.'
        }
      },
      {
        title: 'Arquetipos de contexto comunes',
        content: 'Existen patrones de situación recurrentes en productos digitales que ayudan a formular el contexto rápidamente:',
        checklist: [
          'Tiene dificultades técnicas o de comprensión',
          'Está repitiendo una tarea frecuente o rutinaria',
          'Está comparando alternativas y evaluando pros/contras',
          'Está retomando un trámite que dejó inconcluso',
          'Está a punto de abandonar por frustración o falta de información',
          'Está en un entorno con restricciones (móvil, prisa, baja conectividad)'
        ]
      }
    ]
  },
  {
    id: 'intencion',
    title: 'Paso 3: La Intención',
    badge: 'Framework',
    summary: 'La intención define el objetivo final que el usuario desea lograr, expresado mediante un Job To Be Done contextual.',
    sections: [
      {
        title: 'Estructurar el Job To Be Done (JTBD)',
        content: 'Para evitar diseñar soluciones que el usuario no pidió, obligamos al equipo a formular la intención en tres componentes explícitos:',
        callout: {
          type: 'info',
          title: 'Estructura JTBD Contextual',
          text: 'Cuando [situación o señal] quiero [necesidad inmediata] para poder [objetivo de valor fundamental].'
        }
      },
      {
        title: 'Ejemplo comparativo de intenciones',
        content: 'Observa cómo redactar la intención con precisión cambia el enfoque del diseño:',
        doDont: {
          doText: 'Cuando mi tarjeta es rechazada, quiero ver opciones de pago alternativas para poder finalizar mi compra sin perder los boletos de cine.',
          dontText: 'El usuario quiere que le mostremos un botón de ayuda de soporte técnico.'
        }
      }
    ]
  },
  {
    id: 'decision',
    title: 'Paso 4: La Decisión',
    badge: 'Framework',
    summary: 'Determina si la interfaz debe intervenir o mantenerse al margen, sopesando el costo de equivocarse frente al beneficio esperado.',
    sections: [
      {
        title: 'Las tres posturas de diseño',
        content: 'No todas las señales merecen una adaptación de interfaz. Tenemos tres alternativas estratégicas:',
        checklist: [
          'NO INTERVENIR: La señal existe, pero cambiar la pantalla agregaría más ruido visual o carga que beneficio. Dejar la interfaz intacta.',
          'ACOMPAÑAR: Añadir orientación, hints, badges o explicaciones sin cambiar la jerarquía central ni ocultar elementos.',
          'ADAPTAR: Modificar componentes, reordenar flujos, precargar datos o cambiar la acción primaria visible.'
        ]
      },
      {
        title: 'Matriz de Confianza vs Costo de Error',
        content: 'Si la confianza en la inferencia es Baja y el costo de fallar es Alto (ej. financiero o de privacidad), la interfaz NUNCA debe adaptar agresivamente.',
        callout: {
          type: 'warning',
          title: 'Alerta de riesgo',
          text: 'Cuando el costo de error sea Alto y la confianza sea Media o Baja: Diseña intervenciones reversibles o solicita confirmación explícita antes de ejecutar el cambio.'
        }
      }
    ]
  },
  {
    id: 'respuesta',
    title: 'Paso 5: La Respuesta de Interfaz',
    badge: 'Framework',
    summary: 'Selección de patrones contextuales de interfaz y especificación concreta del cambio visual (Antes vs Después).',
    sections: [
      {
        title: 'La biblioteca de 8 patrones fundamentales',
        content: 'Para no reinventar la rueda en cada proyecto, estructuramos la respuesta en ocho patrones probados:',
        checklist: [
          'Priorizar: destacar lo más probable al inicio',
          'Simplificar: ocultar temporalmente pasos u opciones irrelevantes',
          'Orientar: brindar explicaciones y micro-guías oportunas',
          'Prevenir: advertir discrepancias antes del clic irreversible',
          'Recuperar: brindar caminos directos tras un fallo de sistema',
          'Recordar: precargar información y preferencias habituales',
          'Continuar: acceso directo para retomar flujos interrumpidos',
          'Confirmar: verificar conscientemente intenciones críticas'
        ]
      },
      {
        title: 'Documentación del Antes vs Después',
        content: 'Todo caso debe contrastar claramente el estado actual de la pantalla frente a la propuesta contextual. Esto permite al equipo de desarrollo y diseño evaluar la viabilidad técnica y visual.',
        doDont: {
          doText: 'Describir el cambio en componentes específicos: qué texto cambia, qué botón aparece, qué se reordena.',
          dontText: 'Decir vagamente "la pantalla será más inteligente e intuitiva".'
        }
      }
    ]
  },
  {
    id: 'evidencia',
    title: 'Paso 6: La Evidencia y Medición',
    badge: 'Framework',
    summary: 'Define cómo sabremos con métricas de comportamiento si la intervención contextual realmente ayudó o estorbó.',
    sections: [
      {
        title: 'Outcomes de experiencia',
        content: 'El éxito de una interfaz contextual no se mide solo en conversión económica. Debe evaluarse el alivio cognitivo y la eficacia de la tarea:',
        checklist: [
          'Finalización del journey o tarea sin abandonos',
          'Reducción de errores cometidos por el usuario',
          'Disminución del tiempo de fricción o tiempo de duda',
          'Reducción de solicitudes de soporte o llamadas a contact center',
          'Mayor satisfacción y confianza percibida (CSAT / CES)'
        ]
      },
      {
        title: 'La fórmula de hipótesis medible',
        content: 'Todo caso concluye con una hipótesis falsable:',
        callout: {
          type: 'info',
          title: 'Plantilla de hipótesis',
          text: '"Creemos que al [Respuesta / Patrón] para los usuarios que [Señal], lograremos [Métrica Principal], porque [Contexto e Intención]. Lo validaremos mediante [Método de validación]."'
        }
      }
    ]
  },
  {
    id: 'madurez-contextual-guia',
    title: 'Madurez Contextual en el producto',
    badge: 'Estrategia',
    summary: 'Cómo evaluar y planificar el nivel de sofisticación contextual de tu aplicación sin sobreingeniería.',
    sections: [
      {
        title: 'La falacia de la máxima sofisticación',
        content: 'Muchos equipos asumen erróneamente que una interfaz Nivel 4 (Predictiva / AI) es superior a un Nivel 1 (Sesión). En la práctica, un patrón de Nivel 1 bien ejecutado resuelve el 70% de los problemas de fricción con una fracción del costo técnico y sin riesgos éticos.'
      },
      {
        title: 'Criterios para escalar de nivel',
        content: 'Solo avanza al siguiente nivel de madurez cuando:',
        checklist: [
          'La tasa de error en la señal actual sea menor al 5%',
          'La infraestructura técnica soporte lecturas en tiempo real con latencia < 200ms',
          'Se cuente con telemetría para monitorear efectos secundarios negativos',
          'El usuario perciba un ahorro de tiempo real de al menos 3x frente al flujo estático'
        ]
      }
    ]
  }
];
