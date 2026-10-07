import { ContextualCase } from '../types';

export const DEMO_CASES: ContextualCase[] = [
  {
    id: 'case-pago-fallido',
    title: 'Recuperación asistida tras 3 intentos fallidos de pago',
    journey: 'Pago a beneficiario',
    moment: 'Validación de cuenta destino',
    job: 'Quiero validar correctamente la cuenta para poder realizar el pago de manera segura.',
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-04T15:30:00Z',
    status: 'Lista para prototipar',
    signal: {
      type: 'Error',
      description: 'El usuario corrigió tres veces el número de cuenta y obtuvo error de rechazo de pasarela.',
      source: 'Analytics / logs',
      evidenceType: 'OBSERVADA'
    },
    interpretation: {
      context: 'El usuario podría tener dudas sobre el formato de la cuenta o su banco emisor tiene una restricción activa.',
      intention: 'Completar el pago correctamente sin perder su transacción.',
      confidence: 'Alta'
    },
    decision: {
      userValue: 'Alto',
      errorRisk: 'Medio',
      possibleImpact: 'Fricción',
      intervention: 'SUGERIR',
      rationale: 'Ofrecer una sugerencia contextual clara reduce el abandono sin imponer cambios que puedan confundir al usuario.'
    },
    response: {
      patterns: ['recuperar', 'orientar'],
      description: 'Preservar los datos válidos, explicar por qué la cuenta no pudo validarse en lenguaje humano y ofrecer dos opciones seguras para continuar.',
      fallback: 'Permitir al usuario cerrar la ayuda y continuar con el flujo estándar o reintentar manualmente.',
      before: 'Banner rojo estándar: "Error 402: Transacción declinada. Verifique con su entidad bancaria". El formulario borra los campos y obliga a reescribir todo.',
      after: 'Tarjeta inline con opción asistida: "No pudimos validar esta cuenta después de varios intentos. Puedes revisar el número o elegir otra cuenta registrada [Revisar número] [Elegir otra cuenta]".'
    },
    validation: {
      outcome: 'Recuperación',
      method: 'Prueba de usabilidad',
      primaryMetric: 'Tasa de recuperación del error (usuarios que completan el pago tras el 2do fallo)',
      secondaryMetric: 'Reducción de tickets a soporte (-25%)',
      expectedResult: 'El usuario entiende qué ocurrió y sabe cómo continuar sin abandonar el flujo.'
    }
  },
  {
    id: 'case-retomar-solicitud',
    title: 'Continuación contextual de solicitud de crédito incompleta',
    journey: 'Adquisición de Crédito',
    moment: 'Paso 3: Documentación adjunta',
    job: 'Quiero retomar mi solicitud donde la dejé para poder recibir la aprobación sin repetir formularios.',
    createdAt: '2026-09-28T14:15:00Z',
    updatedAt: '2026-10-02T11:20:00Z',
    status: 'Validada',
    signal: {
      type: 'Abandono',
      description: 'El usuario se detuvo al subir soportes y reingresó al sitio 18 horas después.',
      source: 'Analytics / logs',
      evidenceType: 'OBSERVADA'
    },
    interpretation: {
      context: 'El usuario no tenía los archivos en su dispositivo móvil y ahora reingresa desde su computadora.',
      intention: 'Retomar inmediatamente sin volver a escribir sus datos personales.',
      confidence: 'Alta'
    },
    decision: {
      userValue: 'Alto',
      errorRisk: 'Bajo',
      possibleImpact: 'Confusión',
      intervention: 'ADAPTAR',
      rationale: 'Mostrar directamente la solicitud pendiente ahorra más de 4 minutos y tiene mínimo riesgo de impacto negativo.'
    },
    response: {
      patterns: ['continuar', 'recordar'],
      description: 'Adaptar el inicio del portal mostrando una tarjeta destacada con el progreso guardado (60%) y botón directo para subir archivos.',
      fallback: 'El usuario puede descartar el recordatorio con un botón "No por ahora" y acceder a la página de inicio habitual.',
      before: 'Inicio genérico con ofertas comerciales; el usuario debe buscar "Mis trámites > Pendientes" en un menú profundo.',
      after: 'Banner prominente y no intrusivo: "Tienes una solicitud guardada (Paso 3: Documentos adjuntos). [Continuar solicitud] [Descartar]".'
    },
    validation: {
      outcome: 'Finalización',
      method: 'Comparación A/B',
      primaryMetric: 'Tasa de finalización de trámites reanudados (+30%)',
      secondaryMetric: 'Tiempo promedio de culminación del trámite (-40%)',
      expectedResult: 'Reducir el abandono definitivo en solicitudes de crédito de alta intención.'
    }
  },
  {
    id: 'case-transferencia-frecuente',
    title: 'Atajo contextual para destinatarios habituales de fin de mes',
    journey: 'Banca Móvil',
    moment: 'Selección de destinatario en transferencias',
    job: 'Quiero despachar mis pagos mensuales habituales en menos de 1 minuto sin equivocarme de cuenta.',
    createdAt: '2026-09-20T09:00:00Z',
    updatedAt: '2026-10-03T08:45:00Z',
    status: 'En validación',
    signal: {
      type: 'Historial',
      description: 'Transfiere a los mismos 3 destinatarios entre el día 28 y 2 de cada mes desde hace 6 meses.',
      source: 'Analytics / logs',
      evidenceType: 'OBSERVADA'
    },
    interpretation: {
      context: 'El usuario está ejecutando su rutina fija de pagos quincenales o de nómina.',
      intention: 'Enviar fondos rápidamente a sus contactos de confianza.',
      confidence: 'Alta'
    },
    decision: {
      userValue: 'Alto',
      errorRisk: 'Alto',
      possibleImpact: 'Impacto financiero',
      intervention: 'SUGERIR',
      rationale: 'El valor es muy alto pero por tratarse de dinero se debe sugerir y exigir siempre confirmación biométrica explícita.'
    },
    response: {
      patterns: ['priorizar', 'confirmar'],
      description: 'Destacar una fila de "Pagos sugeridos de fin de mes" con chips de los 3 destinatarios y confirmación paso a paso.',
      fallback: 'La lista completa de todas las cuentas registradas permanece visible debajo con buscador normal.',
      before: 'Lista alfabética plana de 40 destinatarios sin orden de relevancia ni historial de fecha.',
      after: 'Fila de accesos rápidos: "Pagos de fin de mes: [Pedro - $1.200.000] [Arriendo - $2.400.000]". Tocar uno abre confirmación directa.'
    },
    validation: {
      outcome: 'Tiempo',
      method: 'Prueba de usabilidad',
      primaryMetric: 'Tiempo total para completar las transferencias rutinarias',
      secondaryMetric: 'Tasa de confirmación sin errores de destinatario (100%)',
      expectedResult: 'Ahorro del 65% en tiempo sin incrementar errores en destinos de fondos.'
    }
  },
  {
    id: 'case-busqueda-sin-resultados',
    title: 'Orientación contextual en búsqueda técnica con cero resultados',
    journey: 'Exploración de Catálogo B2B',
    moment: 'Resultados de búsqueda de piezas industriales',
    job: 'Quiero encontrar el repuesto correcto aunque haya escrito mal el código para poder cotizarlo.',
    createdAt: '2026-10-03T16:00:00Z',
    updatedAt: '2026-10-05T12:00:00Z',
    status: 'Lista para prototipar',
    signal: {
      type: 'Búsqueda',
      description: 'El usuario ingresó un código técnico con error tipográfico y obtuvo 0 resultados.',
      source: 'Observación',
      evidenceType: 'INFERIDA'
    },
    interpretation: {
      context: 'El usuario conoce la pieza pero utilizó una denominación antigua o errónea en un carácter.',
      intention: 'Localizar la pieza compatible sin tener que llamar a un asesor de ventas.',
      confidence: 'Media'
    },
    decision: {
      userValue: 'Medio',
      errorRisk: 'Bajo',
      possibleImpact: 'Confusión',
      intervention: 'SUGERIR',
      rationale: 'Sugerir equivalencias o piezas compatibles tiene costo de error nulo y rescata la búsqueda.'
    },
    response: {
      patterns: ['orientar', 'simplificar'],
      description: 'Mostrar sugerencia de término corregido y los 3 repuestos más consultados de esa familia técnica.',
      fallback: 'Botón visible para "Mantener búsqueda exacta" o "Chatear con soporte técnico".',
      before: 'Mensaje en blanco: "No se encontraron resultados para su búsqueda."',
      after: 'Pantalla guiada: "¿Buscabas la válvula termostática serie 4? También puedes ver piezas compatibles en esta categoría."'
    },
    validation: {
      outcome: 'Abandono',
      method: 'Analytics',
      primaryMetric: 'Tasa de abandono tras búsqueda con 0 resultados (-35%)',
      secondaryMetric: 'Clics en productos alternativos sugeridos (>20%)',
      expectedResult: 'El usuario encuentra una alternativa viable en el catálogo en lugar de salir del sitio.'
    }
  },
  {
    id: 'case-proceso-abandonado-onboarding',
    title: 'Acompañamiento contextual ante vacilación prolongada en onboarding',
    journey: 'Registro de Comerciante',
    moment: 'Selección de régimen tributario',
    job: 'Quiero saber qué régimen tributario me corresponde para poder activar mi cuenta comercial sin sanciones.',
    createdAt: '2026-10-04T18:00:00Z',
    updatedAt: '2026-10-06T09:10:00Z',
    status: 'Borrador',
    signal: {
      type: 'Tiempo',
      description: 'Permanencia de más de 3 minutos en la pantalla tributaria sin hacer ninguna selección.',
      source: 'Hipótesis',
      evidenceType: 'HIPOTÉTICA'
    },
    interpretation: {
      context: 'El emprendedor no domina los términos legales y teme equivocarse de régimen fiscal.',
      intention: 'Tomar la decisión correcta con lenguaje sencillo.',
      confidence: 'Media'
    },
    decision: {
      userValue: 'Alto',
      errorRisk: 'Bajo',
      possibleImpact: 'Confusión',
      intervention: 'SUGERIR',
      rationale: 'Ofrecer un mini test orientador no bloquea nada y desatasca la indecisión.'
    },
    response: {
      patterns: ['orientar', 'simplificar'],
      description: 'Ofrecer un enlace secundario: "¿No sabes cuál elegir? Responde 2 preguntas rápidas sobre tu negocio".',
      fallback: 'El usuario puede ignorar el asistente y seleccionar directamente cualquiera de los regímenes.',
      before: 'Cuatro opciones con párrafos extensos de leyes tributarias sin ningún tipo de guía.',
      after: 'Asistente liviano de 2 preguntas de sí/no que resalta con una etiqueta verde la opción sugerida para su tipo de negocio.'
    },
    validation: {
      outcome: 'Comprensión',
      method: 'Prueba de usabilidad',
      primaryMetric: 'Tiempo de permanencia en el paso tributario (reducción a menos de 60 segundos)',
      secondaryMetric: 'Percepción de seguridad en la respuesta seleccionada',
      expectedResult: 'El usuario entiende qué opción le corresponde y finaliza el registro con tranquilidad.'
    }
  }
];
