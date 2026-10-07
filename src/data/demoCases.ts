import { ContextualCase } from '../types';

export const DEMO_CASES: ContextualCase[] = [
  {
    id: 'case-pago-fallido',
    title: 'Recuperación asistida tras 3 intentos fallidos de pago',
    journey: 'Pago a beneficiario',
    moment: 'Validación de cuenta destino',
    job: 'Quiero validar correctamente la cuenta para poder realizar el pago de manera segura.',
    isDemo: true,
    demoBadge: 'EJEMPLO SIMULADO',
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-04T15:30:00Z',
    status: 'Lista para prototipar',
    signal: {
      type: 'Error',
      description: 'El usuario corrigió tres veces el número de cuenta y obtuvo error de rechazo de pasarela.',
      source: 'Logs',
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
      readiness: 'PROTOTIPAR',
      rationale: 'Ofrecer una sugerencia contextual clara reduce el abandono sin imponer cambios automáticos que puedan confundir al usuario.'
    },
    response: {
      patterns: ['recuperar', 'orientar'],
      selectedMechanisms: [
        'Preservación de campos válidos ya diligenciados',
        'Error inline contextual con causa clara',
        'Tarjeta inline de recuperación asistida'
      ],
      description: 'Preservar los datos válidos, explicar por qué la cuenta no pudo validarse en lenguaje humano y ofrecer dos opciones seguras para continuar.',
      fallback: 'Permitir al usuario cerrar la ayuda y continuar con el flujo estándar o reintentar manualmente.',
      before: 'Banner rojo estándar: "Error 402: Transacción declinada. Verifique con su entidad bancaria". El formulario borra los campos y obliga a reescribir todo.',
      after: 'Tarjeta inline con opción asistida: "No pudimos validar esta cuenta después de varios intentos. Puedes revisar el número o elegir otra cuenta registrada [Revisar número] [Elegir otra cuenta]".'
    },
    dataRequirements: {
      neededSignal: 'Contador de intentos fallidos consecutivos en la sesión actual',
      source: 'Logs de eventos de pasarela y frontend',
      availability: 'Disponible',
      requiredMaturity: 'M1 Sesión'
    },
    validation: {
      outcome: 'Errores / recuperación',
      method: 'Prueba de usabilidad',
      primaryMetric: 'Esperamos que los usuarios comprendan la causa del error y elijan una vía alternativa de pago sin abandonar.',
      secondaryMetric: 'Esperamos reducir las consultas dirigidas al centro de ayuda por transacciones bloqueadas.',
      expectedResult: 'El usuario entiende qué ocurrió y sabe cómo continuar sin abandonar el flujo.'
    }
  },
  {
    id: 'case-retomar-solicitud',
    title: 'Continuación contextual de solicitud de crédito incompleta',
    journey: 'Adquisición de Crédito',
    moment: 'Paso 3: Documentación adjunta',
    job: 'Quiero retomar mi solicitud donde la dejé para poder recibir la aprobación sin repetir formularios.',
    isDemo: true,
    demoBadge: 'CASO DEMOSTRATIVO',
    createdAt: '2026-09-28T14:15:00Z',
    updatedAt: '2026-10-02T11:20:00Z',
    status: 'Lista para prototipar',
    signal: {
      type: 'Abandono',
      description: 'El usuario se detuvo al subir soportes y reingresó al sitio 18 horas después.',
      source: 'Analytics',
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
      readiness: 'PREPARAR IMPLEMENTACIÓN',
      rationale: 'Mostrar directamente la solicitud pendiente ahorra pasos innecesarios y tiene mínimo riesgo de impacto negativo.'
    },
    response: {
      patterns: ['continuar', 'recordar'],
      selectedMechanisms: [
        'Tarjeta de tarea pendiente en inicio',
        'Acceso directo al paso específico pendiente',
        'Banner contextual no intrusivo con descarte'
      ],
      description: 'Adaptar el inicio del portal mostrando una tarjeta destacada con el progreso guardado y botón directo para subir archivos.',
      fallback: 'El usuario puede descartar el recordatorio con un botón "No por ahora" y acceder a la página de inicio habitual.',
      before: 'Inicio genérico con ofertas comerciales; el usuario debe buscar "Mis trámites > Pendientes" en un menú profundo.',
      after: 'Banner prominente y no intrusivo: "Tienes una solicitud guardada (Paso 3: Documentos adjuntos). [Continuar solicitud] [Descartar]".'
    },
    dataRequirements: {
      neededSignal: 'Estado de borrador pendiente asociado a la cuenta de usuario autenticado',
      source: 'Base de datos transaccional de solicitudes',
      availability: 'Disponible',
      requiredMaturity: 'M2 Journey'
    },
    validation: {
      outcome: 'Finalización',
      method: 'Comparación A/B',
      primaryMetric: 'Esperamos aumentar la tasa de finalización de trámites reanudados desde la pantalla principal.',
      secondaryMetric: 'Esperamos disminuir el tiempo total que tarda un usuario en culminar su solicitud.',
      expectedResult: 'Reducir el abandono definitivo en solicitudes de crédito de alta intención.'
    }
  },
  {
    id: 'case-transferencia-frecuente',
    title: 'Atajo contextual para destinatarios habituales de fin de mes',
    journey: 'Banca Móvil',
    moment: 'Selección de destinatario en transferencias',
    job: 'Quiero despachar mis pagos mensuales habituales en menos de 1 minuto sin equivocarme de cuenta.',
    isDemo: true,
    demoBadge: 'EJEMPLO SIMULADO',
    createdAt: '2026-09-20T09:00:00Z',
    updatedAt: '2026-10-03T08:45:00Z',
    status: 'En validación',
    signal: {
      type: 'Historial',
      description: 'Transfiere a los mismos 3 destinatarios entre el día 28 y 2 de cada mes desde hace 6 meses.',
      source: 'Analytics',
      evidenceType: 'OBSERVADA'
    },
    interpretation: {
      context: 'Es período de pago de obligaciones periódicas recurrentes (arriendo, servicios, familiares).',
      intention: 'Pagar rápidamente a las personas habituales de este período.',
      confidence: 'Alta'
    },
    decision: {
      userValue: 'Alto',
      errorRisk: 'Medio',
      possibleImpact: 'Impacto financiero',
      intervention: 'SUGERIR',
      readiness: 'PROTOTIPAR',
      rationale: 'Ofrecer atajo sugerido visible pero exigiendo confirmación consciente del monto antes de enviar.'
    },
    response: {
      patterns: ['priorizar', 'recordar'],
      selectedMechanisms: [
        'Sección de favoritos y accesos frecuentes',
        'CTA contextual recomendado',
        'Indicador de último valor utilizado'
      ],
      description: 'Colocar una sección horizontal destacada "Tus pagos habituales de fin de mes" al tope de la lista de destinatarios.',
      fallback: 'Buscador completo y lista alfabética estándar disponibles inmediatamente debajo.',
      before: 'Lista alfabética de 45 contactos guardados donde el usuario debe buscar o escribir en cada ocasión.',
      after: 'Burbujas destacadas con avatar: "Pagos de fin de mes: [Mamá] [Arriendo] [Servicios]" con monto habitual sugerido editable.'
    },
    dataRequirements: {
      neededSignal: 'Historial de transacciones por destinatario agrupado por fecha del mes',
      source: 'Motor de analítica transaccional agregada',
      availability: 'Parcial',
      requiredMaturity: 'M3 Historial'
    },
    validation: {
      outcome: 'Tiempo / eficiencia',
      method: 'Prueba de usabilidad',
      primaryMetric: 'Esperamos que los usuarios encuentren a sus destinatarios habituales con menos pasos de búsqueda.',
      secondaryMetric: 'Esperamos cero incidencias de transferencias enviadas a un destinatario no deseado.',
      expectedResult: 'Facilitar la rutina mensual sin comprometer la seguridad ni la verificación de datos.'
    }
  },
  {
    id: 'case-onboarding-vacilacion',
    title: 'Orientación justa a tiempo ante vacilación en selección de plan',
    journey: 'Suscripción SaaS B2B',
    moment: 'Comparativa de planes de precios',
    job: 'Quiero entender qué plan cubre los requisitos de mi equipo sin pagar de más ni quedarme corto.',
    isDemo: true,
    demoBadge: 'CASO DEMOSTRATIVO',
    createdAt: '2026-09-15T16:00:00Z',
    updatedAt: '2026-09-29T10:10:00Z',
    status: 'Lista para prototipar',
    signal: {
      type: 'Tiempo',
      description: 'El usuario permanece más de 90 segundos alternando entre el Plan Pro y Enterprise sin hacer clic en CTA.',
      source: 'Observación',
      evidenceType: 'INFERIDA'
    },
    interpretation: {
      context: 'El usuario duda sobre los límites de asientos o integraciones avanzadas y teme equivocarse.',
      intention: 'Comparar únicamente las diferencias clave entre los dos planes en duda.',
      confidence: 'Media'
    },
    decision: {
      userValue: 'Medio',
      errorRisk: 'Bajo',
      possibleImpact: 'Fricción',
      intervention: 'SUGERIR',
      readiness: 'PROTOTIPAR',
      rationale: 'Una sugerencia de comparación focalizada ayuda a tomar la decisión sin presionar agresivamente la venta.'
    },
    response: {
      patterns: ['orientar', 'simplificar'],
      selectedMechanisms: [
        'Helper inline justo a tiempo',
        'Disclosure desplegable ("¿Por qué te pedimos esto?")',
        'Toggle de opciones avanzadas accesible'
      ],
      description: 'Mostrar un botón flotante discreto "¿Dudas entre Pro y Enterprise? Ver comparativa rápida de diferencias clave".',
      fallback: 'El usuario puede ignorar el botón flotante y continuar revisando la tabla completa.',
      before: 'Tabla estática de 48 filas con ticks y cruces donde el usuario tiene que hacer scroll repetido.',
      after: 'Filtro dinámico de 1 clic: "Ocultar características comunes y ver solo diferencias entre los 2 planes seleccionados".'
    },
    dataRequirements: {
      neededSignal: 'Tiempo en pantalla sin evento de scroll profundo ni clic en CTA',
      source: 'Telemetry de eventos de cliente en navegador',
      availability: 'Disponible',
      requiredMaturity: 'M1 Sesión'
    },
    validation: {
      outcome: 'Comprensión',
      method: 'Entrevista',
      primaryMetric: 'Esperamos que los evaluadores reporten mayor claridad sobre qué plan se adapta a su caso.',
      secondaryMetric: 'Esperamos reducir la tasa de abandono en la página de precios sin selección.',
      expectedResult: 'Aclarar la propuesta de valor sin forzar contacto con ventas.'
    }
  },
  {
    id: 'case-streaming-retorno',
    title: 'Priorización de episodio no finalizado en plataforma de streaming',
    journey: 'Consumo de contenido',
    moment: 'Pantalla principal de inicio',
    job: 'Quiero retomar mi serie favorita exactamente en el minuto que me quedé sin tener que buscarla.',
    isDemo: true,
    demoBadge: 'EJEMPLO SIMULADO',
    createdAt: '2026-09-10T11:00:00Z',
    updatedAt: '2026-09-25T14:00:00Z',
    status: 'Lista para prototipar',
    signal: {
      type: 'Estado del journey',
      description: 'El usuario reprodujo 35 minutos de un episodio de 50 minutos hace menos de 24 horas.',
      source: 'Logs',
      evidenceType: 'OBSERVADA'
    },
    interpretation: {
      context: 'El usuario tuvo que pausar por una interrupción externa y tiene alta intención de terminar el episodio.',
      intention: 'Continuar viendo el episodio con 1 solo toque.',
      confidence: 'Alta'
    },
    decision: {
      userValue: 'Alto',
      errorRisk: 'Bajo',
      possibleImpact: 'Ninguno relevante',
      intervention: 'ADAPTAR',
      readiness: 'PREPARAR IMPLEMENTACIÓN',
      rationale: 'Acelera el consumo sin riesgo negativo: el usuario puede optar por ver cualquier otro contenido si lo prefiere.'
    },
    response: {
      patterns: ['priorizar', 'continuar'],
      selectedMechanisms: [
        'Bloque o tarjeta destacada en cabecera',
        'Barra de progreso persistente con botón de reanudación',
        'Acceso rápido a operaciones habituales'
      ],
      description: 'Fijar el carrusel "Continuar viendo" como primer bloque visual con botón de reproducción directa sobre el thumbnail.',
      fallback: 'El menú superior de categorías y buscador general permanecen visibles en su posición estándar.',
      before: 'Banner publicitario gigante de un estreno no relacionado; el carrusel de continuar viendo queda bajo el scroll.',
      after: 'Tarjeta destacada de cabecera con miniatura, barra de progreso (70%) y botón grande "Continuar: Episodio 4 (Minuto 35)".'
    },
    dataRequirements: {
      neededSignal: 'Timestamp de última reproducción y porcentaje de avance guardado en perfil',
      source: 'Servicio de streaming y telemetría de reproducción',
      availability: 'Disponible',
      requiredMaturity: 'M2 Journey'
    },
    validation: {
      outcome: 'Tiempo / eficiencia',
      method: 'Prototipo',
      primaryMetric: 'Esperamos que el tiempo transcurrido desde que la app abre hasta que el video comienza sea menor a 5 segundos.',
      secondaryMetric: 'Esperamos que la gran mayoría de sesiones de retorno se activen a través del atajo de continuación.',
      expectedResult: 'Facilitar la reanudación inmediata del consumo de medios.'
    }
  }
];
