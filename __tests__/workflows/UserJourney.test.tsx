// @ts-nocheck
/**
 * End-to-End Workflow Validation Tests
 *
 * These tests simulate complete user journeys through the VoteSaathi platform,
 * validating that multi-step workflows function correctly from start to finish.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VoterVerification from '../../src/components/VoterVerification';

describe('User Journey: Voter Verification Workflow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('completes the full verification flow: input → submit → loading → result', async () => {
    const mockVoterData = {
      name: 'RAJESH KUMAR',
      epic: 'DEF7654321',
      state: 'Maharashtra',
      constituency: 'Mumbai North',
      pollingStation: 'St. Xavier High School',
      status: 'Active',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockVoterData),
      })
    ) as jest.Mock;

    render(<VoterVerification />);

    // Step 1: User sees the form
    const input = screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)');
    expect(input).toBeInTheDocument();

    // Step 2: User enters EPIC
    fireEvent.change(input, { target: { value: 'DEF7654321' } });

    // Step 3: User clicks verify
    const btn = screen.getByText('Verify Status');
    fireEvent.click(btn);

    // Step 4: Loading state appears
    expect(screen.getByText('Verifying...')).toBeInTheDocument();

    // Step 5: Voter data renders
    await waitFor(() => {
      expect(screen.getByText('RAJESH KUMAR')).toBeInTheDocument();
      expect(screen.getByText('Mumbai North')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  it('handles network failure gracefully in the verification flow', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network Down'))) as jest.Mock;

    render(<VoterVerification />);

    fireEvent.change(screen.getByPlaceholderText('ENTER EPIC NUMBER (e.g. ABC1234567)'), {
      target: { value: 'ABC9999999' },
    });
    fireEvent.click(screen.getByText('Verify Status'));

    await waitFor(() => {
      expect(screen.getByText(/Verification Failed/i)).toBeInTheDocument();
    });
  });

  it('prevents submission with empty EPIC', () => {
    render(<VoterVerification />);

    const btn = screen.getByText('Verify Status');
    fireEvent.click(btn);

    // Should not show loading state since the form guards against empty input
    expect(screen.queryByText('Verifying...')).not.toBeInTheDocument();
  });
});

describe('User Journey: Accessibility Checks', () => {
  it('renders with correct heading hierarchy', () => {
    render(<VoterVerification />);

    const heading = screen.getByText('API Setu Voter Verification');
    expect(heading.tagName).toBe('H3');
  });

  it('has a submit button with visible label', () => {
    render(<VoterVerification />);

    const btn = screen.getByText('Verify Status');
    expect(btn).toBeVisible();
    expect(btn.tagName).toBe('BUTTON');
  });
});
