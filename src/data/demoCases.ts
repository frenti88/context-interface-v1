import { ContextualCase } from '../types';

export const DEMO_CASES: ContextualCase[] = [
  {
    id: 'case-pago-fallido',
    title: 'Recuperación asistida tras 3 intentos fallidos de pago',
    journey: 'Checkout y Pagos',
    isCustom: false,
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-04T15:30:00Z',
    status: 'En validación',
    signal: {
      type: 'Error',
      description: 'El usuario intentó ingresar tres veces los datos de su tarjeta de crédito o cuenta bancaria y obtuvo error de validación o rechazo de pasarela.',
      source: 'Logs',
      evidenceLevel: 'nivel-1'
    },
    context: {
      interpretation: 'El usuario tiene dificultades para completar la información técnica o su tarjeta tiene un bloqueo preventivo bancario.',
      confidence: 'Alta',
      helperTag: 'Tiene dificultades'
    },
    intention: {
      when: 'tengo un error repetido ingresando mi medio de pago',
      want: 'entender la causa exacta y tener una alternativa inmediata',
      inOrderTo: 'terminar la compra de mis pasajes sin perder mi tarifa reservada',
      jobToBeDone: 'Cuando tengo un error repetido ingresando mi medio de pago, quiero entender la causa exacta y tener una alternativa inmediata para poder terminar la compra de mis pasajes sin perder mi tarifa reservada.'
    },
    decision: {
      intervention: 'Acompañar',
      possibleMisinterpretation: 'Fricción adicional',
      errorCost: 'Bajo',
      rationale: 'Acompañar con sugerencias claras y métodos alternativos tiene bajo riesgo y previene que el usuario abandone el flujo hacia la competencia.'
    },
    response: {
      selectedPatterns: ['orientar', 'recuperar'],
      description: 'Tras el segundo fallo, mostrar un panel contextual no bloqueante con el motivo del rechazo en lenguaje humano y botones de 1 clic para pagar con PSE/transferencia o guardar el pedido 15 minutos.',
      currentInterface: 'Banner rojo estándar en la parte superior: "Error 402: Transacción declinada. Verifique con su entidad bancaria". El formulario borra los campos y obliga a reescribir todo.',
      proposedInterface: 'Tarjeta contextual inline: "Tu banco declinó la tarjeta terminada en 4821. Puede deberse a compras internacionales apagadas. Puedes cambiar a transferencia bancaria directa (PSE) en 1 clic o reservar tu compra por 2 horas mientras contactas a tu banco."'
    },
    evidence: {
      outcome: 'Finalización',
      validationMethod: 'A/B test',
      primaryMetric: 'Tasa de conversión de pagos recuperados (+14%)',
      secondaryMetric: 'Disminución de abandonos en pantalla de checkout (-22%)',
      expectedResult: 'La intervención debería aumentar la finalización del pago en usuarios que sufren al menos un intento fallido.'
    },
    maturityLevel: 1
  },
  {
    id: 'case-retomar-solicitud',
    title: 'Continuación contextual de solicitud de crédito incompleta',
    journey: 'Adquisición de Crédito',
    isCustom: false,
    createdAt: '2026-09-28T14:15:00Z',
    updatedAt: '2026-10-02T11:20:00Z',
    status: 'Validado',
    signal: {
      type: 'Abandono',
      description: 'El usuario completó los pasos 1 y 2 (simulación y datos personales), se detuvo en el paso 3 (adjuntar desprendibles de nómina) y cerró la sesión hace 18 horas.',
      source: 'Analítica',
      evidenceLevel: 'nivel-1'
    },
    context: {
      interpretation: 'El usuario no tenía los documentos a la mano o necesitó buscar archivos en su computador y ahora está reingresando a la plataforma.',
      confidence: 'Alta',
      helperTag: 'Está retomando un proceso'
    },
    intention: {
      when: 'vuelvo a la aplicación después de haber dejado mi solicitud a medias',
      want: 'retomar exactamente donde me quedé sin tener que llenar mis datos otra vez',
      inOrderTo: 'obtener el desembolso de mi crédito para remodelación',
      jobToBeDone: 'Cuando vuelvo a la aplicación después de haber dejado mi solicitud a medias, quiero retomar exactamente donde me quedé sin tener que llenar mis datos otra vez para poder obtener el desembolso de mi crédito.'
    },
    decision: {
      intervention: 'Adaptar',
      possibleMisinterpretation: 'Confusión',
      errorCost: 'Bajo',
      rationale: 'Adaptar la pantalla de inicio para destacar el trámite en curso reduce la fricción dramáticamente. El usuario siempre puede descartar el recordatorio.'
    },
    response: {
      selectedPatterns: ['continuar', 'recordar'],
      description: 'Sustituir el carrusel genérico de bienvenida de la app por una tarjeta de continuación de trámite con barra de progreso al 60% y botón "Subir documentos pendientes".',
      currentInterface: 'Home estándar con banner de ofertas generales y menú que obliga al usuario a buscar "Mis trámites > Solicitudes pendientes" en un submenú profundo.',
      proposedInterface: 'Tarjeta prominente en Home: "Tu solicitud de Crédito por $15,000,000 te está esperando. Solo falta adjuntar tu último desprendible de nómina. [Continuar solicitud (Paso 3 de 4)]".'
    },
    evidence: {
      outcome: 'Finalización',
      validationMethod: 'Analítica',
      primaryMetric: 'Tasa de finalización de solicitudes retomadas (+31%)',
      secondaryMetric: 'Tiempo promedio de culminación del trámite (-45%)',
      expectedResult: 'La tarjeta de reanudación reducirá el tiempo de abandono definitivo e incrementará las aprobaciones completadas.'
    },
    maturityLevel: 2
  },
  {
    id: 'case-transferencia-frecuente',
    title: 'Acceso directo contextual para destinatarios frecuentes de nómina',
    journey: 'Banca Móvil — Transferencias',
    isCustom: false,
    createdAt: '2026-09-20T09:00:00Z',
    updatedAt: '2026-10-03T08:45:00Z',
    status: 'Validado',
    signal: {
      type: 'Historial',
      description: 'El usuario transfiere fondos a los mismos 3 destinatarios entre los días 28 y 2 de cada mes de forma recurrente durante los últimos 6 meses.',
      source: 'Analítica',
      evidenceLevel: 'nivel-1'
    },
    context: {
      interpretation: 'El usuario está cumpliendo con sus pagos periódicos fijos (arriendo, proveedores o colaboradores familiares).',
      confidence: 'Alta',
      helperTag: 'Está realizando una tarea frecuente'
    },
    intention: {
      when: 'llega el fin de mes y debo pagar mis compromisos fijos',
      want: 'tener los destinatarios listos con montos sugeridos',
      inOrderTo: 'despachar mis transferencias en menos de un minuto sin temor a equivocarme de número de cuenta',
      jobToBeDone: 'Cuando llega el fin de mes y debo pagar mis compromisos fijos, quiero tener los destinatarios listos con montos sugeridos para poder despachar mis transferencias en menos de un minuto.'
    },
    decision: {
      intervention: 'Adaptar',
      possibleMisinterpretation: 'Decisión incorrecta',
      errorCost: 'Medio',
      rationale: 'Pre-armar la lista ahorra tiempo valioso, pero siempre debe exigirse confirmación explícita y biometría para mitigar el costo del error financiero.'
    },
    response: {
      selectedPatterns: ['priorizar', 'recordar', 'confirmar'],
      description: 'En el módulo de transferencias, destacar una sección "Pagos habituales de fin de mes" con avatares de los 3 contactos y el monto anterior prellenado como sugerencia editable.',
      currentInterface: 'Lista alfabética de 47 cuentas inscritas donde el usuario debe buscar con scroll o barra de búsqueda cada cuenta individualmente.',
      proposedInterface: 'Fila de chips superiores con foto/iniciales: "Pedro Gómez ($1.200.000)", "Inmobiliaria Norte ($2.400.000)". Al tocar, abre la confirmación con datos pre-cargados.'
    },
    evidence: {
      outcome: 'Tiempo',
      validationMethod: 'Prueba de usabilidad',
      primaryMetric: 'Tiempo de ejecución por transferencia (de 75s a 18s)',
      secondaryMetric: 'Satisfacción subjetiva (NPS del módulo +18 pts)',
      expectedResult: 'Reducción de más del 60% en el tiempo necesario para completar los pagos mensuales repetitivos.'
    },
    maturityLevel: 3
  },
  {
    id: 'case-busqueda-sin-resultados',
    title: 'Orientación contextual en búsqueda con cero resultados',
    journey: 'Exploración de Catálogo B2B',
    isCustom: false,
    createdAt: '2026-10-03T16:00:00Z',
    updatedAt: '2026-10-05T12:00:00Z',
    status: 'En validación',
    signal: {
      type: 'Búsqueda',
      description: 'El usuario escribió un término técnico ("válvula termoeléctrica 3/4 pulg") con error tipográfico o código de fabricante descontinuado y obtuvo 0 resultados.',
      source: 'Logs',
      evidenceLevel: 'nivel-2'
    },
    context: {
      interpretation: 'El usuario busca una referencia técnica precisa que puede haber cambiado de código de catálogo o haber sido escrita con error de digitación.',
      confidence: 'Media',
      helperTag: 'No entiende algo'
    },
    intention: {
      when: 'busco un repuesto por su código antiguo o nombre informal y no aparece',
      want: 'sugerencias de equivalencias o repuestos sustitutos compatibles',
      inOrderTo: 'adquirir la pieza adecuada sin tener que llamar a un asesor de ventas',
      jobToBeDone: 'Cuando busco un repuesto por su código y no aparece, quiero sugerencias de equivalencias para poder adquirir la pieza adecuada de inmediato.'
    },
    decision: {
      intervention: 'Acompañar',
      possibleMisinterpretation: 'Confusión',
      errorCost: 'Bajo',
      rationale: 'Mostrar productos alternativos o sugerencias fonéticas no elimina nada del catálogo y aporta un camino claro para no quedarse atascado en un callejón sin salida.'
    },
    response: {
      selectedPatterns: ['orientar', 'simplificar'],
      description: 'No mostrar una pantalla vacía con "0 resultados". En su lugar, sugerir corrección ortográfica, desglose de filtros aplicados y una lista de "Productos compatibles más buscados en esta categoría".',
      currentInterface: 'Texto plano: "No se encontraron resultados para su búsqueda" con ícono de lupa vacía y sugerencia genérica de revisar la ortografía.',
      proposedInterface: 'Pantalla guiada: "¿Buscabas \'Válvula termostática 3/4\'? También puedes explorar repuestos de la misma categoría o chatear con un especialista técnico con tu referencia copiada automáticamente."'
    },
    evidence: {
      outcome: 'Menos abandono',
      validationMethod: 'Analítica',
      primaryMetric: 'Disminución de tasa de abandono tras búsqueda sin resultados (-35%)',
      secondaryMetric: 'Tasa de clic en productos sugeridos alternativos (>28%)',
      expectedResult: 'Aumentar la retención de compradores técnicos en el flujo de búsqueda sin desviar a canales manuales.'
    },
    maturityLevel: 2
  },
  {
    id: 'case-proceso-abandonado-onboarding',
    title: 'Simplificación contextual ante vacilación prolongada en onboarding',
    journey: 'Registro de Comerciante / Onboarding',
    isCustom: false,
    createdAt: '2026-10-04T18:00:00Z',
    updatedAt: '2026-10-06T09:10:00Z',
    status: 'Borrador',
    signal: {
      type: 'Tiempo',
      description: 'El usuario lleva más de 3 minutos en la pantalla de "Selección de régimen tributario" haciendo scroll arriba y abajo sin seleccionar ninguna opción.',
      source: 'Observación',
      evidenceLevel: 'nivel-3'
    },
    context: {
      interpretation: 'El emprendedor desconoce la diferencia legal entre régimen simplificado y común y teme cometer un error fiscal.',
      confidence: 'Media',
      helperTag: 'Tiene dificultades'
    },
    intention: {
      when: 'tengo que elegir mi régimen tributario para activar mi cuenta comercial',
      want: 'una guía en lenguaje sencillo basada en el tipo de negocio que tengo',
      inOrderTo: 'seleccionar la opción correcta sin miedo a sanciones legales',
      jobToBeDone: 'Cuando tengo que elegir mi régimen tributario, quiero una guía sencilla basada en mi tipo de negocio para poder seleccionar la opción correcta sin temor.'
    },
    decision: {
      intervention: 'Acompañar',
      possibleMisinterpretation: 'Fricción adicional',
      errorCost: 'Bajo',
      rationale: 'Ofrecer un mini asistente guiado de 2 preguntas ("¿Emites facturas electrónicas?", "¿Tus ventas superan $X?") desatasca la indecisión sin imponer nada arbitrario.'
    },
    response: {
      selectedPatterns: ['orientar', 'simplificar'],
      description: 'Desplegar un asistente flotante discreto: "¿No estás seguro de cuál elegir? Responde 2 preguntas rápidas sobre tu negocio y te ayudaremos a identificar tu régimen".',
      currentInterface: 'Cuatro tarjetas técnicas con párrafos del estatuto tributario y botones de radio "Régimen Simple / Ordinario / No responsable".',
      proposedInterface: 'Mismo selector, pero con enlace destacado: "Ayúdame a saber cuál me corresponde". Abre un modal con 2 preguntas de sí/no que marca la recomendación con una etiqueta verde de "Recomendado para ti".'
    },
    evidence: {
      outcome: 'Comprensión',
      validationMethod: 'Prueba de usabilidad',
      primaryMetric: 'Tiempo de permanencia en el paso tributario (reducción de 180s a 45s)',
      secondaryMetric: 'Tasa de finalización del registro de comerciantes (+19%)',
      expectedResult: 'Validar mediante pruebas cualitativas con 8 usuarios si la guía interactiva disipa las dudas legales.'
    },
    maturityLevel: 1
  }
];
