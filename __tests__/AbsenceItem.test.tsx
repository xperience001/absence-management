import React from 'react';
import { render, screen } from '@testing-library/react';
import AbsenceItem from '../src/components/AbsenceItem';

describe('AbsenceItem', () => {
  const absence = {
    id: 1,
    startDate: '2024-06-01',
    endDate: '2024-06-03',
    employeeName: 'John Doe',
    approved: true,
    absenceType: 'Vacation',
  };

  it('renders absence details correctly', () => {
    render(
      <AbsenceItem
        absence={absence}
        fetchConflict={jest.fn()}
        onEmployeeClick={jest.fn()}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Start Date: 2024-06-01')).toBeInTheDocument();
    expect(screen.getByText('End Date: 2024-06-03')).toBeInTheDocument();
    expect(screen.getByText('Type: Vacation')).toBeInTheDocument();
    expect(screen.getByText('Status: Approved')).toBeInTheDocument();
  });
});
