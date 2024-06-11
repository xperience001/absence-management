import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AbsenceList from '../src/components/AbsenceList';

describe('AbsenceList', () => {
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
      startDate: '2024-06-05',
      endDate: '2024-06-07',
      employeeName: 'Jane Smith',
      approved: false,
      absenceType: 'Sick Leave',
    },
  ];

  it('renders all absence items correctly', () => {
    const fetchConflict = jest.fn();
    const onEmployeeClick = jest.fn();
    const onAbsenceClick = jest.fn();

    render(
      <AbsenceList
        absences={absences}
        fetchConflict={fetchConflict}
        onEmployeeClick={onEmployeeClick}
        onAbsenceClick={onAbsenceClick}
        sortedBy={null}
        sortedAsc={true}
        sortFunction={() => 0}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Start Date: 2024-06-01')).toBeInTheDocument();
    expect(screen.getByText('End Date: 2024-06-03')).toBeInTheDocument();
    expect(screen.getByText('Type: Vacation')).toBeInTheDocument();
    expect(screen.getByText('Status: Approved')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Start Date: 2024-06-05')).toBeInTheDocument();
    expect(screen.getByText('End Date: 2024-06-07')).toBeInTheDocument();
    expect(screen.getByText('Type: Sick Leave')).toBeInTheDocument();
    expect(screen.getByText('Status: Pending Approval')).toBeInTheDocument();
  });

  it('triggers onEmployeeClick when an employee name is clicked', () => {
    const fetchConflict = jest.fn();
    const onEmployeeClick = jest.fn();
    const onAbsenceClick = jest.fn();

    render(
      <AbsenceList
        absences={absences}
        fetchConflict={fetchConflict}
        onEmployeeClick={onEmployeeClick}
        onAbsenceClick={onAbsenceClick}
        sortedBy={null}
        sortedAsc={true}
        sortFunction={() => 0}
      />
    );

    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Jane Smith'));

    expect(onEmployeeClick).toHaveBeenCalledTimes(2);
    expect(onEmployeeClick).toHaveBeenCalledWith('John Doe');
    expect(onEmployeeClick).toHaveBeenCalledWith('Jane Smith');
  });

  it('triggers onAbsenceClick when an absence item is clicked', () => {
    const fetchConflict = jest.fn();
    const onEmployeeClick = jest.fn();
    const onAbsenceClick = jest.fn();

    render(
      <AbsenceList
        absences={absences}
        fetchConflict={fetchConflict}
        onEmployeeClick={onEmployeeClick}
        onAbsenceClick={onAbsenceClick}
        sortedBy={null}
        sortedAsc={true}
        sortFunction={() => 0}
      />
    );

    fireEvent.click(screen.getByText('Jane Smith'));

    expect(onAbsenceClick).toHaveBeenCalledTimes(1);
    expect(onAbsenceClick).toHaveBeenCalledWith(absences[1]);
  });
});
