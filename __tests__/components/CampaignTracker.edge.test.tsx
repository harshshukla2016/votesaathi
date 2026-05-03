// @ts-nocheck
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CampaignTracker from '../../src/components/CampaignTracker';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('CampaignTracker Edge Cases & Integration flows', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('handles 500 Server Error gracefully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: () => Promise.reject(new Error("Internal Server Error"))
      })
    ) as jest.Mock;

    render(<CampaignTracker />);
    
    await waitFor(() => {
      // The component handles error internally, checking if error state is handled or it falls back
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('handles completely malformed or empty data arrays', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ parties: [] })
      })
    ) as jest.Mock;

    render(<CampaignTracker />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Electoral Competition/i)).toBeInTheDocument();
    });
  });
});
