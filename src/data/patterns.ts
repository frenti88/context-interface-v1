import { Pattern } from '../types';

export const PATTERNS_DATA: Pattern[] = [
  {
    id: 'priorizar',
    name: 'Priorizar',
    shortDescription: 'Mostrar en primer plano lo que el usuario probablemente necesita en este momento exacto.',
    interventionType: 'Adaptar',
    risk: 'Medio',
    dataLevel: 'Medio',
    journeyMoment: 'Descubrimiento',
    definition: 'Reordena dinámicamente opciones, accesos directos o bloques de contenido para reducir la carga de escaneo visual basada en señales de frecuencia, momento del día o estado del proceso.',
    whenToUse: [
      'Cuando hay alta probabilidad (>70%) de que el usuario busque una acción específica.',
      'En dashboards o menús saturados donde el usuario realiza una acción repetida en ciertos días u horas.',
      'Cuando el estado de un servicio o producto requiere atención inmediata (ej. tarjeta vencida, factura por pagar).'
    ],
    whenToAvoid: [
      'Cuando esconder o desplazar opciones primarias desoriente la memoria muscular del usuario.',
      'Si la predicción es incierta y el usuario tiene que buscar activamente dónde quedó la opción habitual.'
    ],
    frequentSignals: ['Historial de uso', 'Fecha límite próxima', 'Hora habitual de interacción', 'Estado pendiente en journey'],
    example: {
      title: 'Dashboard Bancario el día de pago de nómina',
      before: 'El usuario ve una cuadrícula fija de 12 operaciones idénticas en orden alfabético.',
      after: 'El sistema coloca en primer lugar "Pagar tarjeta de crédito" y "Transferir a cuenta de ahorros" con el saldo disponible destacado.'
    },
    risksDescription: 'Romper la memoria espacial del usuario si el cambio de orden ocurre de manera impredecible o errática.',
    recommendedMetrics: ['Tiempo hasta completar primera acción', 'Tasa de clics en la opción priorizada', 'Reducción de abandonos en pantalla de inicio'],
    associatedCasesCount: 4
  },
  {
    id: 'simplificar',
    name: 'Simplificar',
    shortDescription: 'Ocultar o colapsar pasos y datos no relevantes para la situación actual del usuario.',
    interventionType: 'Adaptar',
    risk: 'Medio',
    dataLevel: 'Bajo',
    journeyMoment: 'Ejecución',
    definition: 'Reduce temporalmente la densidad de información o bifurcaciones en el flujo cuando el usuario está ejecutando una tarea enfocada o bajo alta carga cognitiva.',
    whenToUse: [
      'En flujos de checkout, contratación o configuración sensible.',
      'Cuando el usuario ya seleccionó un camino y las demás opciones son irrelevantes.',
      'En dispositivos móviles para evitar fatiga por scroll excesivo.'
    ],
    whenToAvoid: [
      'Cuando ocultar opciones limite la capacidad de cambiar de opinión o comparar alternativas.',
      'Si se ocultan datos regulatorios, costos o términos obligatorios sin un toggle visible.'
    ],
    frequentSignals: ['Inicio de checkout', 'Tiempo prolongado en formulario denso', 'Tasa alta de abandono en pasos secundarios'],
    example: {
      title: 'Flujo de Transferencia Internacional',
      before: 'El formulario solicita simultáneamente datos de intermediario, códigos BIC/SWIFT, moneda alternativa y configuración de alertas.',
      after: 'Se agrupan y ocultan los campos opcionales bajo "Configuración avanzada", mostrando solo destino, monto y tasa de cambio garantizada.'
    },
    risksDescription: 'Generar desconfianza si el usuario siente que le están ocultando condiciones o alternativas importantes.',
    recommendedMetrics: ['Tasa de finalización del formulario', 'Tiempo promedio por pantalla', 'Tasa de errores por omisión'],
    associatedCasesCount: 3
  },
  {
    id: 'orientar',
    name: 'Orientar',
    shortDescription: 'Proporcionar explicaciones contextuales o guías de ayuda sin romper el flujo de trabajo.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Bajo',
    journeyMoment: 'Ejecución',
    definition: 'Presenta micro-ayudas, hints o recordatorios en el momento exacto en que el usuario se detiene o muestra señales de duda, sin alterar la estructura central de la pantalla.',
    whenToUse: [
      'Cuando el usuario se detiene por más de 15 segundos en un campo o paso ambiguo.',
      'En primera interacción con una funcionalidad nueva o compleja.',
      'Ante términos técnicos, legales o financieros que suscitan dudas habituales.'
    ],
    whenToAvoid: [
      'En tareas repetitivas donde el tooltip o hint se convierte en spam visual molesto.',
      'Para compensar una mala arquitectura de información en lugar de corregir la raíz.'
    ],
    frequentSignals: ['Tiempo detenido sin interacción', 'Pase de cursor errático o clics en áreas no clickeables', 'Primer uso registrado'],
    example: {
      title: 'Ingreso de Número de Referencia Catastral',
      before: 'Un campo de texto plano con la etiqueta "Código catastral" sin ayuda visual.',
      after: 'Al hacer foco en el campo, aparece un inline helper mostrando un extracto de la factura física señalando dónde encontrar dicho código.'
    },
    risksDescription: 'Sobrecargar la pantalla con tooltips intrusivos o banners que compitan con la tarea principal.',
    recommendedMetrics: ['Reducción de llamadas a soporte', 'Disminución de tiempo de duda', 'Tasa de clics en "más información"'],
    associatedCasesCount: 5
  },
  {
    id: 'prevenir',
    name: 'Prevenir',
    shortDescription: 'Anticipar errores o incongruencias antes de que el usuario envíe su solicitud.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Medio',
    journeyMoment: 'Ejecución',
    definition: 'Valida reglas de negocio y restricciones en tiempo real, alertando de discrepancias (ej. saldo insuficiente, formato inválido, horario no hábil) antes de presionar confirmar.',
    whenToUse: [
      'Transacciones con costos irreversibles o transferencias a destinatarios desconocidos.',
      'Operaciones programadas para fines de semana o feriados bancarios.',
      'Archivos o documentos que no cumplen los requisitos de formato/peso.'
    ],
    whenToAvoid: [
      'Validar agresivamente mientras el usuario aún está escribiendo (validación prematura frustrante).',
      'Bloquear el avance sin explicar claramente cómo resolver la condición.'
    ],
    frequentSignals: ['Monto digitado superior al saldo disponible', 'Horario bancario cerrado', 'Caracteres especiales no soportados'],
    example: {
      title: 'Transferencia con monto superior al saldo',
      before: 'El usuario llena todos los datos, presiona confirmar, pasa el token de seguridad y luego recibe "Error: Saldo insuficiente".',
      after: 'Tan pronto como el monto supera el saldo, el botón muestra "Saldo insuficiente ($450 disponibles)" con opción rápida de transferir entre sus propias cuentas.'
    },
    risksDescription: 'Falsos positivos que impidan al usuario intentar una acción legítima o que generen alarma innecesaria.',
    recommendedMetrics: ['Reducción de errores en backend', 'Tasa de éxito en primer intento', 'Satisfacción de usuario (CSAT)'],
    associatedCasesCount: 5
  },
  {
    id: 'recuperar',
    name: 'Recuperar',
    shortDescription: 'Ofrecer caminos directos y claros de resolución inmediatamente después de un error.',
    interventionType: 'Adaptar',
    risk: 'Medio',
    dataLevel: 'Medio',
    journeyMoment: 'Error',
    definition: 'Transforma una pantalla de error genérica en una superficie de asistencia guiada, sugiriendo la acción correctiva más probable y conservando el estado previo del usuario.',
    whenToUse: [
      'Fallos en pasarelas de pago, autenticación fallida o caída de servicios externos.',
      'Reintentos repetidos (ej. 2 o 3 errores consecutivos en el mismo input).',
      'Subida de documentos rechazada por OCR o validación biométrica.'
    ],
    whenToAvoid: [
      'Cuando el error requiere contactar soporte legal y no se puede resolver digitalmente (en ese caso debe ser directo al canal humano).',
      'Reintentar automáticamente sin consentimiento del usuario en operaciones con cargo económico.'
    ],
    frequentSignals: ['Error de API 4xx/5xx', '3 intentos fallidos consecutivos', 'Timeout de sesión'],
    example: {
      title: 'Pago rechazado con tarjeta',
      before: '"Error 104: Transacción no procesada. Contacte a su banco."',
      after: '"Tu tarjeta terminada en 4821 fue declinada por límite de compras en línea. Puedes pagar con PSE o activar compras digitales en tu app bancaria con este paso a paso."'
    },
    risksDescription: 'Proponer una solución errónea que termine bloqueando al usuario en un loop de reintentos frustrantes.',
    recommendedMetrics: ['Tasa de recuperación tras error', 'Disminución de abandono definitivo', 'Reducción de tickets a soporte'],
    associatedCasesCount: 6
  },
  {
    id: 'recordar',
    name: 'Recordar',
    shortDescription: 'Reutilizar información o elecciones previas para ahorrar esfuerzo al usuario.',
    interventionType: 'Adaptar',
    risk: 'Bajo',
    dataLevel: 'Alto',
    journeyMoment: 'Retorno',
    definition: 'Precarga valores frecuentes, destinatarios habituales, métodos de pago preferidos o filtros guardados para evitar que el usuario deba reconstruirlos desde cero.',
    whenToUse: [
      'Usuarios recurrentes que repiten operaciones idénticas con regularidad.',
      'Formularios donde el 90% de los usuarios reutiliza la misma dirección o cuenta bancaria.',
      'Filtros de búsqueda en herramientas de uso diario (B2B SaaS).'
    ],
    whenToAvoid: [
      'En datos sensibles en dispositivos compartidos o públicos (riesgo de privacidad).',
      'Si el contexto anterior ya no es relevante (ej. forzar una dirección de envío antigua cuando es un regalo).'
    ],
    frequentSignals: ['Historial de 3+ transacciones al mismo beneficiario', 'Dispositivo reconocido', 'Preferencia guardada'],
    example: {
      title: 'Pago de Servicios Públicos',
      before: 'El usuario debe buscar el convenio, digitar la referencia de 18 dígitos y seleccionar el banco cada mes.',
      after: 'Aparece una tarjeta rápida: "Factura de Agua lista para pagar: $34.500 (referencia habitual)". Un clic para confirmar.'
    },
    risksDescription: 'Incurrir en confirmaciones erróneas por automatismo ciego del usuario.',
    recommendedMetrics: ['Tiempo de ciclo de tarea', 'Tasa de adopción de la sugerencia', 'Errores por envío a destino incorrecto'],
    associatedCasesCount: 4
  },
  {
    id: 'continuar',
    name: 'Continuar',
    shortDescription: 'Permitir retomar un flujo interrumpido exactamente en el punto de avance previo.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Medio',
    journeyMoment: 'Retorno',
    definition: 'Detecta borradores no enviados, carritos con productos o solicitudes a medio camino y presenta un acceso directo para retomar sin fricción ni pérdida de datos.',
    whenToUse: [
      'Procesos largos (onboarding, solicitud de crédito, cotizaciones complejas).',
      'Cuando el usuario se desconectó o cerró la ventana por accidente.',
      'Al alternar entre canal web y móvil.'
    ],
    whenToAvoid: [
      'Si los datos del borrador han expirado o las condiciones de precio/tasa cambiaron sustancialmente.',
      'Si el usuario abandonó intencionalmente y el banner se percibe invasivo o persistente.'
    ],
    frequentSignals: ['Sesión reanudada con borrador guardado', 'Retorno tras abandono en paso 3 de 5', 'Notificación push clickeada'],
    example: {
      title: 'Solicitud de Crédito de Libre Inversión',
      before: 'El usuario vuelve al sitio y ve el formulario de crédito en blanco en el paso 1.',
      after: 'Banner prominente y no intrusivo: "Tienes una solicitud guardada (Paso 3: Documentos adjuntos). ¿Deseas retomarla donde la dejaste?"'
    },
    risksDescription: 'Confusión si los términos o vigencia de los datos cambiaron mientras estuvo fuera.',
    recommendedMetrics: ['Tasa de reactivación de procesos', 'Finalización de solicitudes incompletas', 'Tasa de retención'],
    associatedCasesCount: 5
  },
  {
    id: 'confirmar',
    name: 'Confirmar',
    shortDescription: 'Verificar explícitamente la intención antes de ejecutar un cambio o acción de alto impacto.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Bajo',
    journeyMoment: 'Cierre',
    definition: 'Introduce un paso de verificación consciente y legible cuando la acción tiene consecuencias irreversibles, alto costo de error o cuando la confianza en la señal es moderada.',
    whenToUse: [
      'Acciones destructivas o irreversibles (eliminar cuenta, transferir fondos altos, cancelar suscripción).',
      'Cuando la inferencia del sistema tiene costo de error alto y confianza media o baja.',
      'Cambios que impactan a terceros o la configuración global de una organización.'
    ],
    whenToAvoid: [
      'En acciones cotidianas de bajo impacto (generar "fatiga de diálogo modal").',
      'Como sustituto de una buena función de deshacer (Undo).'
    ],
    frequentSignals: ['Clic en acción crítica', 'Monto inusualmente alto', 'Inferencia automática con confianza media'],
    example: {
      title: 'Transferencia por monto 5x superior al promedio',
      before: 'El sistema procesa la transferencia inmediatamente con un simple clic sin doble chequeo de datos del destinatario.',
      after: 'Modal de confirmación clara: "Estás transfiriendo $5,000,000 a Juan Pérez (Cuenta Bancolombia *4920). Este valor es mayor a tus envíos habituales. ¿Confirmas la operación?"'
    },
    risksDescription: 'Generar fricción innecesaria si se abusa de confirmaciones en tareas rutinarias.',
    recommendedMetrics: ['Reducción de solicitudes de reversión de cargos', 'Índice de seguridad percibida', 'Tasa de cancelación consciente'],
    associatedCasesCount: 4
  }
];
