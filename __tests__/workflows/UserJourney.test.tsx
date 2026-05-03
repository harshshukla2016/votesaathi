// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VoterVerification from '../../src/components/VoterVerification';

// Mock the global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      name: "HARSH SHUKLA",
      epic: "ABC1234567",
      state: "MAHARASHTRA",
      constituency: "PUNE",
      pollingStation: "ZP Primary School",
      status: "ACTIVE"
    }),
  })
) as jest.Mock;

describe('VoterVerification Edge Cases & Integration', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('does not trigger fetch if EPIC input is empty', async () => {
    render(<VoterVerification />);
    const button = screen.getByText('Verify Status');
    fireEvent.click(button);
    
    // Fetch should not have been called because input is empty
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('handles absolute network failure (Promise rejection)', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error("Network Down")));

    render(<VoterVerification />);
    const input = screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)');
    fireEvent.change(input, { target: { value: 'XYZ9876543' } });
    
    const button = screen.getByText('Verify Status');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Verification Failed/i)).toBeInTheDocument();
    });
  });

  it('handles malformed API response data', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          epic: "INVALID_DATA_FORMAT" // Missing name, status, etc.
        }),
      })
    );

    render(<VoterVerification />);
    const input = screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)');
    fireEvent.change(input, { target: { value: 'XYZ9876543' } });
    
    const button = screen.getByText('Verify Status');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Status')).toBeInTheDocument(); // Falls back to empty values but UI still shows labels
    });
  });
});
