import React, { useState } from 'react';
import { useCases } from '../../context/CasesContext';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNavigation } from './MobileNavigation';
import { SearchModal } from './SearchModal';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { 
    activeView, 
    navigateTo, 
    startNewCase, 
    cases, 
    isSearchOpen, 
    setIsSearchOpen, 
    setActivePlaybookChapter,
    resetToDemoCases
  } = useCases();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If in wizard, show standalone full-width wizard experience without standard sidebar
  if (activeView === 'wizard') {
    return (
      <div className="min-h-screen bg-[#FAFAFB] text-[#0F172A]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#0F172A] flex flex-col md:flex-row antialiased">
      {/* Desktop Collapsible Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={navigateTo}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        casesCount={cases.length}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Topbar */}
        <Topbar
          activeView={activeView}
          onOpenSearch={() => setIsSearchOpen(true)}
          onNewCase={() => startNewCase()}
          onResetDemo={resetToDemoCases}
        />

        {/* Content Body */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation
        activeView={activeView}
        onNavigate={navigateTo}
        onNewCase={() => startNewCase()}
        onResetDemo={resetToDemoCases}
      />

      {/* Command Palette (⌘K) Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        cases={cases}
        onNavigate={navigateTo}
        onSelectPlaybookChapter={setActivePlaybookChapter}
      />
    </div>
  );
};
