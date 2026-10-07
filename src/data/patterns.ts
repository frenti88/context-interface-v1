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
    uiMechanisms: [
      'Reordenamiento inteligente de lista',
      'Bloque o tarjeta destacada en cabecera',
      'CTA contextual recomendado',
      'Acceso rápido a operaciones habituales'
    ],
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
    uiMechanisms: [
      'Colapso progresivo de campos opcionales',
      'Modo de enfoque en formulario (Focus View)',
      'Toggle de opciones avanzadas accesible',
      'Reducción de bifurcaciones no pertinentes'
    ],
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
    shortDescription: 'Brindar explicaciones y micro-guías oportunas sin cambiar la estructura principal de la pantalla.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Bajo',
    journeyMoment: 'Descubrimiento',
    definition: 'Provee microcopias explicativas, hints o advertencias informativas en el momento exacto en que el usuario podría dudar, preservando completamente la jerarquía visual de la pantalla.',
    whenToUse: [
      'Cuando el usuario pasa mucho tiempo en un campo sin interactuar (vacilación).',
      'En términos bancarios, legales o técnicos que suelen generar confusión.',
      'Tras un cambio reciente de interfaz para educar suavemente sobre la nueva ubicación de funciones.'
    ],
    whenToAvoid: [
      'Llenar la pantalla de popups o modales intrusivos que tapen el contenido.',
      'Explicar obviedades que añadan ruido de lectura visual.'
    ],
    frequentSignals: ['Vacilación prolongada en campo', 'Búsqueda repetida de ayuda o FAQ', 'Primer acceso al flujo'],
    uiMechanisms: [
      'Helper inline justo a tiempo',
      'Tooltip contextual no invasivo',
      'Hint debajo del label',
      'Disclosure desplegable ("¿Por qué te pedimos esto?")',
      'Ejemplo visual del dato esperado'
    ],
    example: {
      title: 'Ingreso de Código de Seguridad CVV en Tarjeta Virtual',
      before: 'Campo plano que dice "CVV". El usuario de tarjeta virtual duda porque no tiene plástico físico.',
      after: 'Texto de ayuda dinámico: "Encuentra tu código dinámico de 3 dígitos en la app de tu banco (expira cada 5 minutos)".'
    },
    risksDescription: 'Ceguera de banners si se usa en exceso; el usuario aprende a ignorar la ayuda si aparece por todo lado.',
    recommendedMetrics: ['Reducción de vacilación en campo', 'Disminución de clics en FAQ', 'Tasa de éxito en primer intento'],
    associatedCasesCount: 5
  },
  {
    id: 'prevenir',
    name: 'Prevenir',
    shortDescription: 'Advertir discrepancias o inconsistencias antes de que el usuario cometa un error irreversible.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Medio',
    journeyMoment: 'Ejecución',
    definition: 'Analiza en segundo plano los datos ingresados para alertar sobre inconsistencias probables (ej. monto fuera de rango habitual, cuenta inactiva) antes de que el usuario envíe la acción.',
    whenToUse: [
      'En transferencias por montos significativamente superiores a la media del usuario.',
      'Cuando el destinatario ingresado coincide con un patrón típico de fraude o número sospechoso.',
      'En formularios donde un error causará penalizaciones económicas o retrasos de días.'
    ],
    whenToAvoid: [
      'Bloquear despachos legítimos con falsos positivos persistentes.',
      'Generar pánico con alertas alarmistas cuando se trata de una advertencia suave.'
    ],
    frequentSignals: ['Monto inusual respecto a histórico', 'Patrón de tipeo errático', 'Discrepancia entre banco y tipo de cuenta'],
    uiMechanisms: [
      'Validación inline anticipada antes de enviar',
      'Alerta temprana de discrepancia no bloqueante',
      'Sugerencia de autocompletado verificado',
      'Salvaguarda suave antes de acción irreversible'
    ],
    example: {
      title: 'Transferencia por monto con un cero extra',
      before: 'El usuario escribe $1.000.000 en vez de $100.000 y el sistema envía la transacción sin advertir.',
      after: 'Banner suave: "Este monto es 10 veces mayor que tus pagos habituales a este destinatario. Por favor confirma que deseas transferir $1.000.000 COP".'
    },
    risksDescription: 'Falsa sensación de seguridad si el sistema no detecta todos los casos, o molestia por falsos positivos.',
    recommendedMetrics: ['Tasa de transacciones erróneas reclamadas', 'Porcentaje de correcciones tras advertencia'],
    associatedCasesCount: 3
  },
  {
    id: 'recuperar',
    name: 'Recuperar',
    shortDescription: 'Brindar caminos directos y preservar datos tras un fallo de sistema o error del usuario.',
    interventionType: 'Adaptar',
    risk: 'Medio',
    dataLevel: 'Bajo',
    journeyMoment: 'Error',
    definition: 'Cuando ocurre una falla (de red, validación o negocio), la interfaz conserva el trabajo realizado, explica la causa en lenguaje humano y ofrece alternativas inmediatas.',
    whenToUse: [
      'Tras rechazo de pasarela de pago o error de validación de formulario.',
      'Cuando la sesión expira por inactividad pero el usuario regresa pronto.',
      'Ante caídas temporales de servicios externos o APIs bancarias.'
    ],
    whenToAvoid: [
      'Reintentar automáticamente transacciones que ya fueron debitadas (riesgo de doble cobro).',
      'Culpar al usuario con mensajes técnicos crípticos.'
    ],
    frequentSignals: ['Error de API / pasarela', 'Intento fallido repetido (≥2 veces)', 'Timeout de conexión'],
    uiMechanisms: [
      'Error inline contextual con causa clara',
      'Preservación de campos válidos ya diligenciados',
      'Tarjeta inline de recuperación asistida',
      'CTA de reintento inteligente con feedback de estado',
      'Sugerencia de método alternativo directo',
      'Acceso contextual a canal de soporte prioritario'
    ],
    example: {
      title: 'Tarjeta rechazada por fondos insuficientes',
      before: 'Pantalla roja "Transacción rechazada 501". Formulario vacío.',
      after: 'Formulario con datos preservados: "Tu tarjeta Visa terminada en 4821 no pudo procesarse. Puedes intentar con tu cuenta de ahorros vinculada o con otra tarjeta registrada [Usar cuenta de ahorros]".'
    },
    risksDescription: 'Confundir al usuario sobre el estado final de su dinero si el mensaje no aclara que NO hubo cobro.',
    recommendedMetrics: ['Tasa de recuperación tras error', 'Reducción de abandonos definitivos tras fallo', 'Tasa de tickets a soporte'],
    associatedCasesCount: 4
  },
  {
    id: 'recordar',
    name: 'Recordar',
    shortDescription: 'Precargar información, selecciones y preferencias habituales del usuario.',
    interventionType: 'Adaptar',
    risk: 'Bajo',
    dataLevel: 'Alto',
    journeyMoment: 'Descubrimiento',
    definition: 'Reconoce al usuario recurrente y anticipa valores predeterminados seguros (dirección de entrega usual, cuenta favorita, formato de factura preferido) permitiendo cambiarlos con un solo clic.',
    whenToUse: [
      'En pagos periódicos recurrentes (servicios públicos, nómina, arriendo).',
      'Para usuarios frecuentes que siempre eligen el mismo método de envío o sucursal.',
      'En filtros de búsqueda que el usuario aplica sistemáticamente en cada visita.'
    ],
    whenToAvoid: [
      'En dispositivos compartidos o públicos donde exponer preferencias viole la privacidad.',
      'Cuando el cambio inadvertido de un dato precargado tenga costo económico para el usuario.'
    ],
    frequentSignals: ['Historial consolidado (≥3 repeticiones)', 'Preferencia declarada guardada', 'Coincidencia de fecha habitual'],
    uiMechanisms: [
      'Campos precargados con opción de cambio inmediato',
      'Sección de favoritos y accesos frecuentes',
      'Indicador de último valor utilizado',
      'Toggle explícito de "Guardar como preferencia"'
    ],
    example: {
      title: 'Pago mensual de suscripción o servicio',
      before: 'El usuario debe seleccionar entidad, digitar número de contrato de 12 dígitos y seleccionar cuenta debitable cada mes.',
      after: 'Tarjeta lista con factura precargada: "Factura de Energía de este mes: $85.000 COP [Pagar con cuenta principal]".'
    },
    risksDescription: 'Inercia del usuario que acepta datos precargados sin verificar si en esta ocasión necesitaba cambiarlos.',
    recommendedMetrics: ['Tiempo promedio de transacción', 'Tasa de errores por destino equivocado'],
    associatedCasesCount: 4
  },
  {
    id: 'continuar',
    name: 'Continuar',
    shortDescription: 'Ofrecer acceso directo y claro para retomar flujos que quedaron inconclusos.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Medio',
    journeyMoment: 'Retorno',
    definition: 'Detecta cuando un usuario regresa tras haber dejado un trámite, carrito o formulario a medias, y le ofrece retomar exactamente donde quedó sin perder el contexto global.',
    whenToUse: [
      'Trámites largos con guardado automático (solicitudes de crédito, declaraciones, registros).',
      'Carritos de compra abandonados en las últimas 48 horas.',
      'Cambio de dispositivo (empezó en móvil y continúa en desktop).'
    ],
    whenToAvoid: [
      'Trámites donde las condiciones cambiaron drásticamente (tasas de cambio o inventario agotado).',
      'Forzar la continuación si el usuario ingresó explícitamente a hacer otra cosa.'
    ],
    frequentSignals: ['Borrador guardado en sesión previa', 'Reingreso en menos de 24h tras abandono', 'Trámite con estado en proceso'],
    uiMechanisms: [
      'Tarjeta de tarea pendiente en inicio',
      'Barra de progreso persistente con botón de reanudación',
      'Banner contextual no intrusivo con descarte',
      'Acceso directo al paso específico pendiente'
    ],
    example: {
      title: 'Solicitud de Crédito con documentos pendientes',
      before: 'Home genérico. El usuario debe buscar el correo de confirmación con el link para continuar.',
      after: 'Banner en la pantalla de inicio: "Tienes una solicitud de Crédito en curso (Paso 3 de 4). [Continuar solicitud] [Descartar]".'
    },
    risksDescription: 'Molestia si el banner de reanudación persiste incluso después de que el usuario ya no desea continuar.',
    recommendedMetrics: ['Tasa de reanudación de trámites', 'Tiempo total hasta finalización'],
    associatedCasesCount: 3
  },
  {
    id: 'confirmar',
    name: 'Confirmar',
    shortDescription: 'Verificar conscientemente intenciones críticas antes de ejecutar cambios irreversibles.',
    interventionType: 'Acompañar',
    risk: 'Bajo',
    dataLevel: 'Bajo',
    journeyMoment: 'Cierre',
    definition: 'Introduce una pausa reflexiva o verificación de doble factor en momentos de alta consecuencia para asegurar que el usuario comprende el impacto antes de dar el paso final.',
    whenToUse: [
      'Operaciones de alto impacto financiero (transferencias grandes, cancelaciones de contratos).',
      'Eliminación permanente de datos o configuración sensible.',
      'Cuando la inferencia del sistema sea incierta y el costo de error sea alto.'
    ],
    whenToAvoid: [
      'Acciones triviales y cotidianas donde una confirmación cree fricción inútil.',
      'Modales repetitivos que el usuario termine cerrando en piloto automático.'
    ],
    frequentSignals: ['Acción clasificada de alto riesgo', 'Monto superior a umbral crítico', 'Modificación de credenciales'],
    uiMechanisms: [
      'Confirmation Sheet deslizable con resumen de impacto',
      'Modal de confirmación explícito con datos clave destacados',
      'Revisión paso a paso antes de envío final',
      'Mecanismo de confirmación consciente (deslizar o escribir palabra)'
    ],
    example: {
      title: 'Cancelación definitiva de cuenta de inversión',
      before: 'Botón "Cancelar cuenta" que ejecuta la orden con un simple clic sin resumen de cargos.',
      after: 'Hoja de confirmación que resume: saldo pendiente por liquidar, retenciones tributarias aplicables y botón deslizable para confirmar conscientemente.'
    },
    risksDescription: 'Fatiga por confirmaciones; si todo pide confirmar, el usuario deja de leer los mensajes.',
    recommendedMetrics: ['Reducción de cancelaciones accidentales', 'Satisfacción en procesos sensibles'],
    associatedCasesCount: 2
  }
];
