import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Make sure this import is present
import AbsenceControls from '../src/components/AbsenceControls';

test('renders AbsenceControls component with sorting buttons', () => {
  const handleSort = jest.fn();

  const { getByText } = render(<AbsenceControls onSort={handleSort} />);
  const startDateButton = getByText('Sort by Start Date');
  const endDateButton = getByText('Sort by End Date');
  const absenceTypeButton = getByText('Sort by Absence Type');
  const employeeNameButton = getByText('Sort by Employee Name');

  expect(startDateButton).toBeInTheDocument();
  expect(endDateButton).toBeInTheDocument();
  expect(absenceTypeButton).toBeInTheDocument();
  expect(employeeNameButton).toBeInTheDocument();

  fireEvent.click(startDateButton);
  fireEvent.click(endDateButton);
  fireEvent.click(absenceTypeButton);
  fireEvent.click(employeeNameButton);

  expect(handleSort).toHaveBeenCalledTimes(4);
  expect(handleSort).toHaveBeenCalledWith('startDate');
  expect(handleSort).toHaveBeenCalledWith('endDate');
  expect(handleSort).toHaveBeenCalledWith('absenceType');
  expect(handleSort).toHaveBeenCalledWith('employeeName'); 
});
