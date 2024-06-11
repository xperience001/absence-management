import React from 'react';

interface AbsenceControlsProps {
  onSort: (field: string) => void;
}

const AbsenceControls: React.FC<AbsenceControlsProps> = ({ onSort }) => {
  return (
    <div className="absences-controls">
      <SortButton label="Start Date" onClick={() => onSort('startDate')} />
      <SortButton label="End Date" onClick={() => onSort('endDate')} />
      <SortButton label="Absence Type" onClick={() => onSort('absenceType')} />
      <SortButton label="Employee Name" onClick={() => onSort('employeeName')} />
    </div>
  );
};

interface SortButtonProps {
  label: string;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>Sort by {label}</button>
  );
};

export default AbsenceControls;
