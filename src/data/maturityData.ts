export interface MaturityLevelInfo {
  level: number;
  name: string;
  shortDescription: string;
  characteristics: string[];
  dataRequired: string;
  typicalResponse: string;
  risks: string;
  realExample: string;
}

export const MATURITY_LEVELS: MaturityLevelInfo[] = [
  {
    level: 0,
    name: 'Estática',
    shortDescription: 'La experiencia es exactamente igual para todos los usuarios en todo momento.',
    characteristics: [
      'Menús, contenidos y flujos fijos e inmutables.',
      'No reacciona a eventos en tiempo real ni al historial.',
      'Máxima predictibilidad para el usuario, cero personalización.'
    ],
    dataRequired: 'Ninguno. Solo las reglas del sistema.',
    typicalResponse: 'Mostrar la pantalla estándar definida en diseño sin alteraciones.',
    risks: 'Falta de relevancia, sobrecarga cognitiva en flujos complejos y frustración ante errores repetitivos.',
    realExample: 'Un formulario gubernamental donde todos los campos están visibles por igual sin importar el tipo de trámite o nacionalidad.'
  },
  {
    level: 1,
    name: 'Sesión',
    shortDescription: 'La interfaz responde a acciones recientes o eventos inmediatos dentro de la misma sesión activa.',
    characteristics: [
      'Reacciona a errores inmediatos, tiempo de permanencia o clics consecutivos.',
      'No requiere guardar cookies de largo plazo ni identificar al usuario previamente.',
      'Adaptaciones efímeras que desaparecen al cerrar el navegador o cambiar de pestaña.'
    ],
    dataRequired: 'Estado temporal en memoria (DOM events, conteo de errores, tiempo de inactividad).',
    typicalResponse: 'Mostrar un hint tras 3 errores, sugerir autocompletar un campo o abrir un modal de recuperación.',
    risks: 'Intervenciones invasivas si las reglas de disparo (triggers) son demasiado sensibles.',
    realExample: 'Un checkout de e-commerce que detecta un código postal inválido y muestra una sugerencia de corrección al instante.'
  },
  {
    level: 2,
    name: 'Journey',
    shortDescription: 'Comprende el proceso que el usuario intenta completar a través de múltiples pasos o puntos de contacto.',
    characteristics: [
      'Entiende en qué fase del embudo o trámite se encuentra el usuario.',
      'Conecta el origen de la visita (ej. email con link de pago) con la pantalla de destino.',
      'Conserva borradores entre pasos y calcula progreso real.'
    ],
    dataRequired: 'Estado de la transacción o trámite (backend/database de sesión persistente).',
    typicalResponse: 'Destacar el paso pendiente, saltar pasos ya validados o adaptar el header al flujo en curso.',
    risks: 'Asumir que el usuario quiere forzosamente continuar el trámite anterior cuando tal vez desea iniciar uno nuevo.',
    realExample: 'Una app de onboarding bancario que al reingresar muestra directamente la pantalla de toma de selfie pendiente sin pedir datos iniciales.'
  },
  {
    level: 3,
    name: 'Historial',
    shortDescription: 'Aprovecha interacciones pasadas, hábitos recurrentes y preferencias guardadas para simplificar tareas.',
    characteristics: [
      'Reconoce patrones de uso repetitivos (ej. transferencias a fin de mes, compras quincenales).',
      'Pre-llena datos frecuentes o muestra atajos a destinos habituales.',
      'Adapta la interfaz con base en meses o semanas de interacción acumulada.'
    ],
    dataRequired: 'Perfil de usuario, registros históricos consolidados, agregaciones de frecuencia.',
    typicalResponse: 'Lista de "Tus operaciones frecuentes", preselección del método de pago habitual o reordenamiento del home.',
    risks: 'Inercia errónea: cuando el usuario quiere hacer algo diferente por excepción y la interfaz insiste en lo habitual.',
    realExample: 'Una app de movilidad que al abrirse en día hábil a las 8:00 AM ya tiene pre-seleccionado como destino "Oficina" con 1 solo toque para pedir.'
  },
  {
    level: 4,
    name: 'Predictiva',
    shortDescription: 'Combina múltiples señales en tiempo real y modelos inferenciales para anticipar la intención antes de que se exprese.',
    characteristics: [
      'Correlaciona variables cruzadas: geolocalización, hábitos, clima, eventos de calendario, patrones de red.',
      'Genera interfaces altamente dinámicas y contingentes.',
      'Requiere mecanismos de control explícito y salida de emergencia siempre visibles.'
    ],
    dataRequired: 'Modelos de machine learning, telemetría en tiempo real, contexto ambiental y perfil omnicanal.',
    typicalResponse: 'Generar dinámicamente una superficie de acción única orientada al escenario detectado.',
    risks: 'Alto costo de error: si la predicción es errónea, el usuario se siente invadido, desconcertado o manipulado ("el efecto uncanny valley de UX").',
    realExample: 'Una app de viajes que detecta retraso de vuelo en el aeropuerto y transforma la pantalla principal en una tarjeta de canje de voucher de restaurante y cambio de conexión aérea.'
  }
];

export interface EvaluatorQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    label: string;
    description: string;
    points: number; // 0 to 4
  }[];
}

export const EVALUATOR_QUESTIONS: EvaluatorQuestion[] = [
  {
    id: 'data-availability',
    question: '1. ¿Qué datos tienes disponibles de manera confiable en el momento de la interacción?',
    description: 'Evalúa la fuente real con la que tu equipo técnico puede operar hoy.',
    options: [
      {
        label: 'Ningún dato específico del usuario (tráfico anónimo / sin identificación)',
        description: 'No podemos saber quién es ni qué hizo antes de esta visita.',
        points: 0
      },
      {
        label: 'Solo lo que ocurre en la pantalla actual (clics, errores, tiempo)',
        description: 'Disponemos de eventos del navegador o app en la sesión viva.',
        points: 1
      },
      {
        label: 'El estado del trámite o pedido (sabemos qué proceso inició)',
        description: 'Base de datos transaccional con el estado del trámite.',
        points: 2
      },
      {
        label: 'Historial completo de compras o transacciones de meses anteriores',
        description: 'Data warehouse o perfil de usuario con historial enriquecido.',
        points: 3
      },
      {
        label: 'Múltiples señales cruzadas en tiempo real + modelos predictivos',
        description: 'Contexto ambiental, ubicación, comportamiento en tiempo real y analítica avanzada.',
        points: 4
      }
    ]
  },
  {
    id: 'error-cost',
    question: '2. ¿Qué ocurre si la interfaz se equivoca al interpretar la situación?',
    description: 'El costo de fallar determina cuánta audacia puede permitirse el diseño.',
    options: [
      {
        label: 'Costo crítico o irreversible (pérdida económica, brecha de datos, rechazo legal)',
        description: 'Equivocarse en la personalización generaría un reclamo grave o sanción.',
        points: 0
      },
      {
        label: 'Fricción moderada (el usuario debe corregir un dato o volver atrás)',
        description: 'Una molestia leve que se soluciona en 2 segundos.',
        points: 2
      },
      {
        label: 'Sin impacto relevante (es una sugerencia o hint que se puede ignorar)',
        description: 'La experiencia base sigue funcionando exactamente igual.',
        points: 3
      }
    ]
  },
  {
    id: 'user-expectation',
    question: '3. ¿Con qué frecuencia el usuario realiza esta misma acción en este canal?',
    description: 'La regularidad justifica invertir en niveles de memoria contextual más profundos.',
    options: [
      {
        label: 'Es una acción única o muy esporádica (ej. solicitar hipoteca, abrir cuenta)',
        description: 'La mayoría de personas lo hace una o dos veces en la vida.',
        points: 1
      },
      {
        label: 'Proceso recurrente que toma varios días o sesiones (trámite con pasos)',
        description: 'El usuario entra, avanza, pausa y vuelve más tarde.',
        points: 2
      },
      {
        label: 'Uso diario o semanal intensivo (operaciones frecuentes repetitivas)',
        description: 'El usuario ya tiene hábitos fijados y memoria muscular.',
        points: 3
      }
    ]
  },
  {
    id: 'reversibility',
    question: '4. ¿La adaptación propuesta es reversible y permite al usuario ignorarla?',
    description: 'La autonomía del usuario es la regla de oro del diseño contextual.',
    options: [
      {
        label: 'No es reversible (el sistema toma la decisión y no deja alternativa)',
        description: 'Muy peligroso para niveles altos de madurez.',
        points: 0
      },
      {
        label: 'Medianamente reversible (se puede deshacer pero requiere buscar la opción)',
        description: 'Requiere precaución y confirmación previa.',
        points: 2
      },
      {
        label: '100% reversible y no invasiva (es un atajo o sugerencia visible)',
        description: 'El usuario conserva el control absoluto de la interfaz en todo momento.',
        points: 4
      }
    ]
  }
];
