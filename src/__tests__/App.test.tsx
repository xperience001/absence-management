import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('shows all absences for an employee when their name is clicked', async () => {
  const absences = [
    {
      id: 1,
      startDate: '2024-06-01',
      endDate: '2024-06-03',
      employeeName: 'John Doe',
      approved: true,
      absenceType: 'Vacation',
    },
    {
      id: 2,
      startDate: '2024-07-01',
      endDate: '2024-07-03',
      employeeName: 'Jane Smith',
      approved: false,
      absenceType: 'Sick Leave',
    },
    {
      id: 3,
      startDate: '2024-08-01',
      endDate: '2024-08-03',
      employeeName: 'John Doe',
      approved: true,
      absenceType: 'Work From Home',
    },
  ];

  fetchMock.mockResponseOnce(JSON.stringify(absences));

  render(<App />);

  // Wait for the data to load
  await screen.findByText('John Doe');

  // Click on John Doe's name
  fireEvent.click(screen.getByText('John Doe'));

  // Wait for John Doe's absences to be filtered and displayed
  const johnDoeAbsence1 = await screen.findByText('Start Date: 2024-06-01');
  const johnDoeAbsence2 = await screen.findByText('Start Date: 2024-08-01');

  // Verify that only John Doe's absences are displayed
  expect(johnDoeAbsence1).toBeInTheDocument();
  expect(screen.getByText('End Date: 2024-06-03')).toBeInTheDocument();
  expect(screen.getByText('Type: Vacation')).toBeInTheDocument();
  expect(screen.getByText('Status: Approved')).toBeInTheDocument();

  expect(johnDoeAbsence2).toBeInTheDocument();
  expect(screen.getByText('End Date: 2024-08-03')).toBeInTheDocument();
  expect(screen.getByText('Type: Work From Home')).toBeInTheDocument();
  expect(screen.getByText('Status: Approved')).toBeInTheDocument();

  // Verify that Jane Smith's absence is not displayed
  expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
});
