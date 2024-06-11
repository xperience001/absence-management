import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AbsenceControls from '../src/components/AbsenceControls';

describe('AbsenceControls', () => {
  it('renders correctly', () => {
    render(<AbsenceControls onSort={jest.fn()} />);
    expect(screen.getByText('Sort by Start Date')).toBeInTheDocument();
    expect(screen.getByText('Sort by End Date')).toBeInTheDocument();
    expect(screen.getByText('Sort by Absence Type')).toBeInTheDocument();
    expect(screen.getByText('Sort by Employee Name')).toBeInTheDocument();
  });

  it('calls onSort function with correct field when buttons are clicked', () => {
    const mockOnSort = jest.fn();
    render(<AbsenceControls onSort={mockOnSort} />);
    fireEvent.click(screen.getByText('Sort by Start Date'));
    expect(mockOnSort).toHaveBeenCalledWith('startDate');
    fireEvent.click(screen.getByText('Sort by End Date'));
    expect(mockOnSort).toHaveBeenCalledWith('endDate');
    fireEvent.click(screen.getByText('Sort by Absence Type'));
    expect(mockOnSort).toHaveBeenCalledWith('absenceType');
    fireEvent.click(screen.getByText('Sort by Employee Name'));
    expect(mockOnSort).toHaveBeenCalledWith('employeeName');
  });
});
