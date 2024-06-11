import React from 'react';
import { render } from '@testing-library/react';
import AbsenceList from '../src/components/AbsenceList';

test('renders AbsenceList component with absence items', () => {
  const absences = [
    {
      id: 1,
      startDate: '2024-06-01',
      endDate: '2024-06-05',
      employeeName: 'John Doe',
      approved: true,
      absenceType: 'Vacation'
    },
    {
      id: 2,
      startDate: '2024-06-10',
      endDate: '2024-06-12',
      employeeName: 'Jane Smith',
      approved: false,
      absenceType: 'Sick Leave'
    }
  ];
  const fetchConflict = jest.fn(() => Promise.resolve(false));
  const onEmployeeClick = jest.fn();
  const sortedBy = null; // Set sortedBy to null for this test
  const sortedAsc = true; // Set sortedAsc to true for this test
  const sortFunction = jest.fn(); // You can define a mock sort function for testing

  const { getByText } = render(
    <AbsenceList
      absences={absences}
      fetchConflict={fetchConflict}
      onEmployeeClick={onEmployeeClick}
      sortedBy={sortedBy}
      sortedAsc={sortedAsc}
      sortFunction={sortFunction}
    />
  );

  expect(getByText('Start Date: 2024-06-01')).toBeInTheDocument();
  expect(getByText('End Date: 2024-06-05')).toBeInTheDocument();
  expect(getByText('Employee Name: John Doe')).toBeInTheDocument();
  expect(getByText('Status: Approved')).toBeInTheDocument();
  expect(getByText('Absence Type: Vacation')).toBeInTheDocument();

  expect(getByText('Start Date: 2024-06-10')).toBeInTheDocument();
  expect(getByText('End Date: 2024-06-12')).toBeInTheDocument();
  expect(getByText('Employee Name: Jane Smith')).toBeInTheDocument();
  expect(getByText('Status: Pending Approval')).toBeInTheDocument();
  expect(getByText('Absence Type: Sick Leave')).toBeInTheDocument();
});
