import React, { useState } from 'react';
import { Layers, ArrowRight, Play, RotateCcw, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { BeforeAfterView } from '../components/card/BeforeAfterView';

interface ScenarioState {
  id: string;
  label: string;
  description: string;
  signalDetected: string;
  gateDecision: 'NO ADAPTAR' | 'SUGERIR' | 'ADAPTAR' | 'PREGUNTAR';
  responsePatterns: string[];
  interfaceResponse: {
    title: string;
    description: string;
    before: string;
    after: string;
  };
}

const SIMULATOR_SCENARIOS: ScenarioState[] = [
  {
    id: 'cero-errores',
    label: '0 Errores (Primer intento)',
    description: 'El usuario ingresa por primera vez a pagar y no ha cometido ningún error.',
    signalDetected: 'Tráfico estándar sin fallos registrados.',
    gateDecision: 'NO ADAPTAR',
    responsePatterns: ['Experiencia Estándar'],
    interfaceResponse: {
      title: 'Pantalla habitual inalterada',
      description: 'No intervenir. Modificar la pantalla en el primer intento generaría confusión y ruido innecesario.',
      before: 'Formulario de pago estándar con campos de cuenta, titular y monto vacíos.',
      after: 'Formulario estándar (cero cambios respecto a la experiencia habitual).'
    }
  },
  {
    id: 'dos-errores',
    label: '2 Errores (Vacilación)',
    description: 'El usuario intentó enviar el pago 2 veces y la pasarela reportó formato inválido.',
    signalDetected: 'Error repetido consecutivamente en la misma sesión.',
    gateDecision: 'SUGERIR',
    responsePatterns: ['Orientar'],
    interfaceResponse: {
      title: 'Acompañamiento inline no bloqueante',
      description: 'Orientar: Mostrar un micro-helper debajo del campo con el formato de dígitos requerido y ejemplo de extracto.',
      before: 'Mensaje rojo genérico: "Dato inválido" que borra todo el campo.',
      after: 'Hint sutil debajo del input: "¿Tu cuenta es de ahorros o corriente? Recuerda que las cuentas de ahorros tienen 11 dígitos."'
    }
  },
  {
    id: 'tres-errores',
    label: '3 Errores (Bloqueo crítico)',
    description: 'Tercer fallo consecutivo. Alta probabilidad de abandono inminente.',
    signalDetected: 'Error repetido 3 veces + tiempo detenido > 45s.',
    gateDecision: 'ADAPTAR',
    responsePatterns: ['Recuperar', 'Orientar'],
    interfaceResponse: {
      title: 'Superficie de recuperación contextual',
      description: 'Recuperar + Orientar: Preservar datos válidos, explicar la causa técnica en lenguaje humano y habilitar botón de pago alternativo (PSE).',
      before: 'Error modal bloqueante 402: "Transacción fallida. Intente más tarde o llame a soporte".',
      after: 'Tarjeta contextual: "No pudimos validar esta cuenta tras 3 intentos. Para no perder tu tarifa, puedes pagar con PSE o elegir otra cuenta registrada [Pagar con PSE] [Elegir otra cuenta]".'
    }
  },
  {
    id: 'usuario-recurrente',
    label: 'Usuario recurrente (Fin de mes)',
    description: 'Usuario habitual en fecha de pago periódico reconocido por el sistema.',
    signalDetected: 'Historial de 6 meses realizando la misma transferencia entre el 28 y 2 de cada mes.',
    gateDecision: 'SUGERIR',
    responsePatterns: ['Priorizar', 'Recordar', 'Confirmar'],
    interfaceResponse: {
      title: 'Atajos a destinatarios frecuentes con confirmación',
      description: 'Priorizar + Recordar: Mostrar chips de pagos habituales con montos sugeridos y solicitar confirmación biométrica.',
      before: 'Menú alfabético de 40 destinatarios donde el usuario debe buscar con scroll cada uno.',
      after: 'Fila de accesos rápidos: "Tus pagos de fin de mes listos: [Pedro - $1.200.000] [Arriendo - $2.400.000]" con confirmación en 1 toque.'
    }
  },
  {
    id: 'tarea-abandonada',
    label: 'Tarea abandonada (Retorno)',
    description: 'El usuario vuelve a la app 12 horas después de pausar una solicitud en el paso 3.',
    signalDetected: 'Sesión reanudada con borrador incompleto al 60%.',
    gateDecision: 'ADAPTAR',
    responsePatterns: ['Continuar'],
    interfaceResponse: {
      title: 'Tarjeta de reanudación directa en Home',
      description: 'Continuar: Sustituir el carrusel publicitario por un acceso directo que retoma el trámite con los datos guardados intactos.',
      before: 'Inicio estándar; el usuario debe buscar "Mis trámites pendientes" en un submenú.',
      after: 'Banner principal: "Tu solicitud de crédito sigue guardada (Paso 3: Documentos). ¿Deseas continuar donde la dejaste? [Continuar trámite]".'
    }
  }
];

export const ScenarioSimulatorView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('dos-errores');

  const currentScenario = SIMULATOR_SCENARIOS.find((s) => s.id === selectedId) || SIMULATOR_SCENARIOS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 text-[#0F172A]">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Laboratorio Interactivo
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Simulador de Escenarios Contextuales
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
          Demuestra cómo cambia una interfaz contextual ante diferentes estados de la interacción antes de escribir código productivo.
        </p>
      </div>

      {/* State Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
          Selecciona el estado del usuario para simular la respuesta:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {SIMULATOR_SCENARIOS.map((sc) => {
            const isSelected = selectedId === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedId(sc.id)}
                className={`p-3.5 rounded-card border text-left transition-all flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                }`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm">{sc.label}</div>
                  <div className={`text-[11px] mt-1 leading-tight line-clamp-2 ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}>
                    {sc.description}
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-200/40 text-[10px] uppercase font-bold flex items-center justify-between">
                  <span className={isSelected ? 'text-amber-300' : 'text-neutral-500'}>
                    Gate: {sc.gateDecision}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Stage: Estado -> Señal -> Respuesta */}
      <div className="bg-white rounded-card border border-neutral-300 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Dynamic Flow Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-neutral-200">
          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              1. Estado simulado
            </span>
            <span className="font-bold text-sm text-neutral-900 block">{currentScenario.label}</span>
            <p className="text-xs text-neutral-600">{currentScenario.description}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              2. Señal detectada
            </span>
            <span className="font-bold text-sm text-neutral-900 block">Evento observable</span>
            <p className="text-xs text-neutral-600">{currentScenario.signalDetected}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-900 text-white space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
              3. Respuesta contextual
            </span>
            <span className="font-bold text-sm block">
              {currentScenario.gateDecision} • {currentScenario.responsePatterns.join(' + ')}
            </span>
            <p className="text-xs text-neutral-300">{currentScenario.interfaceResponse.title}</p>
          </div>
        </div>

        {/* Visual Before vs After for the selected scenario */}
        <div className="space-y-2">
          <h3 className="font-bold text-base text-neutral-900">
            Comportamiento de la pantalla: Experiencia Estándar vs. Respuesta Contextual
          </h3>
          <p className="text-xs text-neutral-500">
            {currentScenario.interfaceResponse.description}
          </p>

          <BeforeAfterView
            before={currentScenario.interfaceResponse.before}
            after={currentScenario.interfaceResponse.after}
          />
        </div>
      </div>
    </div>
  );
};
