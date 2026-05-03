import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CampaignTracker from '../../src/components/CampaignTracker';

// Mock the global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      parties: [
        { name: "Progressive Bloc", symbol: "🟢", candidate: "Dr. A. Sharma", majorPromise: "Universal Healthcare" },
        { name: "Conservative Alliance", symbol: "🔵", candidate: "R. Singh", majorPromise: "Economic Growth" }
      ],
      hotSeats: [
        { name: "Mumbai South", status: "Critical", keyIssue: "Infrastructure" }
      ],
      campaignTrail: [
        { leader: "Dr. A. Sharma", event: "Rally", location: "Pune", time: "2 hours ago" }
      ]
    }),
  })
) as jest.Mock;

describe('CampaignTracker', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially', async () => {
    render(<CampaignTracker scope="National" stateName="" />);
    expect(screen.getByText('Gathering Campaign Intelligence...')).toBeInTheDocument();
    // Wait for fetch to resolve to clear the act warning
    await waitFor(() => {
      expect(screen.queryByText('Gathering Campaign Intelligence...')).not.toBeInTheDocument();
    });
  });

  it('renders fetched data correctly', async () => {
    render(<CampaignTracker scope="National" stateName="" />);
    
    await waitFor(() => {
      expect(screen.getByText('Progressive Bloc')).toBeInTheDocument();
      expect(screen.getByText('Conservative Alliance')).toBeInTheDocument();
      expect(screen.getByText('Mumbai South')).toBeInTheDocument();
      expect(screen.getByText(/Pune/)).toBeInTheDocument();
    });
  });

  it('displays state name when scope is State', async () => {
    render(<CampaignTracker scope="State" stateName="Maharashtra" />);
    
    await waitFor(() => {
      expect(screen.getByText('Maharashtra Scope')).toBeInTheDocument();
    });
  });
});
