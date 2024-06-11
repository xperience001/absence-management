import React, { useEffect, useState } from 'react';

interface Absence {
  id: number;
  startDate: string;
  endDate: string;
  employeeName: string;
  approved: boolean;
  absenceType: string;
}

interface AbsenceItemProps {
  absence: Absence;
  fetchConflict: (id: number) => Promise<boolean>;
  onEmployeeClick: (employeeName: string) => void;
}

const AbsenceItem: React.FC<AbsenceItemProps> = ({ absence, fetchConflict, onEmployeeClick }) => {
  const [hasConflict, setHasConflict] = useState(false);

  useEffect(() => {
    const getConflict = async () => {
      const conflict = await fetchConflict(absence.id);
      setHasConflict(conflict);
    };
    getConflict();
  }, [absence.id, fetchConflict]);

  return (
    <div className="absence-item">
      <div>Start Date: {absence.startDate}</div>
      <div>End Date: {absence.endDate}</div>
      <div>Employee Name: {absence.employeeName}</div>
      <div>Status: {absence.approved ? 'Approved' : 'Pending Approval'}</div>
      <div>Absence Type: {absence.absenceType}</div>
      <div className={`conflict-indicator ${hasConflict ? 'conflict' : 'no-conflict'}`}>
        {hasConflict ? 'Conflicts' : 'No Conflicts'}
      </div>
      <button onClick={() => onEmployeeClick(absence.employeeName)}>
        Show All Absences for {absence.employeeName}
      </button>
    </div>
  );
};

export default AbsenceItem;
