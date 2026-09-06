import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';

const TestConsumer: React.FC = () => {
  const { language, setLanguage, t, currentUser, switchUserRole, vendors } = useApp();

  return (
    <div>
      <span data-testid="lang-display">{language}</span>
      <span data-testid="trans-display">{t('Welcome', 'እንኳን ደህና መጡ')}</span>
      <span data-testid="user-role">{currentUser.role}</span>
      <span data-testid="vendor-count">{vendors.length}</span>
      
      <button onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}>
        Toggle Language
      </button>
      <button onClick={() => switchUserRole('COMPOST_OPERATOR')}>
        Switch Role
      </button>
    </div>
  );
};

describe('AppContext & Localization', () => {
  it('provides initial state and translates based on active language', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    // Initial language is 'en'
    expect(screen.getByTestId('lang-display').textContent).toBe('en');
    expect(screen.getByTestId('trans-display').textContent).toBe('Welcome');
    expect(Number(screen.getByTestId('vendor-count').textContent)).toBeGreaterThan(0);

    // Toggle to Amharic
    const toggleBtn = screen.getByText('Toggle Language');
    act(() => {
      toggleBtn.click();
    });

    expect(screen.getByTestId('lang-display').textContent).toBe('am');
    expect(screen.getByTestId('trans-display').textContent).toBe('እንኳን ደህና መጡ');
  });

  it('switches current user role', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    const switchBtn = screen.getByText('Switch Role');
    act(() => {
      switchBtn.click();
    });

    expect(screen.getByTestId('user-role').textContent).toBe('COMPOST_OPERATOR');
  });
});
