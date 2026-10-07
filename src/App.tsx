import React from 'react';
import { CasesProvider, useCases } from './context/CasesContext';
import { AppShell } from './components/layout/AppShell';
import { HomeView } from './views/HomeView';
import { WizardView } from './views/WizardView';
import { PlaybookView } from './views/PlaybookView';
import { PatternsView } from './views/PatternsView';
import { EvidenceView } from './views/EvidenceView';
import { MaturityView } from './views/MaturityView';
import { CasesView } from './views/CasesView';
import { MeasurementView } from './views/MeasurementView';
import { MyCasesView } from './views/MyCasesView';
import { CaseDetailView } from './views/CaseDetailView';

const AppContent: React.FC = () => {
  const { activeView } = useCases();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'wizard':
        return <WizardView />;
      case 'playbook':
        return <PlaybookView />;
      case 'patterns':
        return <PatternsView />;
      case 'evidence':
        return <EvidenceView />;
      case 'maturity':
        return <MaturityView />;
      case 'cases':
        return <CasesView />;
      case 'measurement':
        return <MeasurementView />;
      case 'my-cases':
        return <MyCasesView />;
      case 'case-detail':
        return <CaseDetailView />;
      default:
        return <HomeView />;
    }
  };

  return <AppShell>{renderView()}</AppShell>;
};

export const App: React.FC = () => {
  return (
    <CasesProvider>
      <AppContent />
    </CasesProvider>
  );
};

export default App;
