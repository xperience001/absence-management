import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AbsenceItem from '../src/components/AbsenceItem';

test('renders AbsenceItem component with absence data', async () => {
  const absence = {
    id: 1,
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    employeeName: 'John Doe',
    approved: true,
    absenceType: 'Vacation'
  };
  const fetchConflict = jest.fn(() => Promise.resolve(false));
  const onEmployeeClick = jest.fn();

  const { getByText } = render(
    <AbsenceItem
      absence={absence}
      fetchConflict={fetchConflict}
      onEmployeeClick={onEmployeeClick}
    />
  );

  const startDate = getByText('Start Date: 2024-06-01');
  const endDate = getByText('End Date: 2024-06-05');
  const employeeName = getByText('Employee Name: John Doe');
  const status = getByText('Status: Approved');
  const absenceType = getByText('Absence Type: Vacation');

  expect(startDate).toBeInTheDocument();
  expect(endDate).toBeInTheDocument();
  expect(employeeName).toBeInTheDocument();
  expect(status).toBeInTheDocument();
  expect(absenceType).toBeInTheDocument();

  await waitFor(() => {
    expect(fetchConflict).toHaveBeenCalledTimes(1);
    expect(fetchConflict).toHaveBeenCalledWith(1);
  });
});
