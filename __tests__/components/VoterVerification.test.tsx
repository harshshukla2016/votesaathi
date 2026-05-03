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

describe('VoterVerification', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders input field correctly', () => {
    render(<VoterVerification />);
    expect(screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<VoterVerification />);
    const input = screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)');
    fireEvent.change(input, { target: { value: 'abc1234567' } });
    expect(input).toHaveValue('ABC1234567'); // Should uppercase automatically
  });

  it('submits form and displays verification data', async () => {
    render(<VoterVerification />);
    
    const input = screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)');
    fireEvent.change(input, { target: { value: 'ABC1234567' } });
    
    const button = screen.getByText('Verify Status');
    fireEvent.click(button);
    
    expect(screen.getByText('Verifying...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('HARSH SHUKLA')).toBeInTheDocument();
      expect(screen.getByText('PUNE')).toBeInTheDocument();
      expect(screen.getByText('ACTIVE')).toBeInTheDocument();
      expect(screen.getByText('ZP Primary School')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(<VoterVerification />);
    
    const input = screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)');
    fireEvent.change(input, { target: { value: 'WRONG123' } });
    
    const button = screen.getByText('Verify Status');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Verification Failed: Unable to synchronize with ECI Gateway via API Setu.')).toBeInTheDocument();
    });
  });
});
