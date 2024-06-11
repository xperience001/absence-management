import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import AbsenceItemDetails from '../src/components/AbsenceItemDetails';

describe('AbsenceItemDetails', () => {
  const absence = {
    id: 1,
    startDate: '2024-06-01',
    endDate: '2024-06-03',
    employeeName: 'John Doe',
    approved: true,
    absenceType: 'Vacation',
  };

  const mockFetchConflict = jest.fn();

  it('renders absence details correctly', async () => {
    mockFetchConflict.mockResolvedValue(false);

    render(<AbsenceItemDetails absence={absence} fetchConflict={mockFetchConflict} />);

    await waitFor(() => {
      expect(screen.getByText('Absence Details')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Employee Name: John Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Start Date: 2024-06-01')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('End Date: 2024-06-03')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Type: Vacation')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Status: Approved')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('No Conflicts')).toBeInTheDocument();
    });
  });

  it('displays conflict status correctly', async () => {
    mockFetchConflict.mockResolvedValue(true);

    render(<AbsenceItemDetails absence={absence} fetchConflict={mockFetchConflict} />);

    await waitFor(() => {
      expect(screen.getByText('Absence Details')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText('Employee Name: John Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Start Date: 2024-06-01')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('End Date: 2024-06-03')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Type: Vacation')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Status: Approved')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Has Conflicts')).toBeInTheDocument();
    });
  });
});
