// components/AbsenceControls.tsx
import React from 'react';

interface AbsenceControlsProps {
  onSort: (field: string) => void;
}

const AbsenceControls: React.FC<AbsenceControlsProps> = ({ onSort }) => {
  return (
    <div className="absences-controls">
      <button onClick={() => onSort('startDate')}>Sort by Start Date</button>
      <button onClick={() => onSort('endDate')}>Sort by End Date</button>
      <button onClick={() => onSort('absenceType')}>Sort by Absence Type</button>
      <button onClick={() => onSort('employeeName')}>Sort by Employee Name</button>
    </div>
  );
};

export default AbsenceControls;
