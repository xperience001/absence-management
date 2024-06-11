import React, { useState, useEffect } from 'react';

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
  const [hasConflict, setHasConflict] = useState<boolean>(false);

  useEffect(() => {
    const checkConflict = async () => {
      const conflict = await fetchConflict(absence.id);
      setHasConflict(conflict);
    };

    checkConflict();
  }, [absence.id, fetchConflict]);

  return (
    <div className={`absence-item ${hasConflict ? 'conflict' : ''}`}>
      <div onClick={() => onEmployeeClick(absence.employeeName)}>
        <h3>{absence.employeeName}</h3>
      </div>
      <p>Start Date: {absence.startDate}</p>
      <p>End Date: {absence.endDate}</p>
      <p>Type: {absence.absenceType}</p>
      <p>Status: {absence.approved ? 'Approved' : 'Pending Approval'}</p>
      {hasConflict && <p style={{ color: 'red' }}>Conflict Detected</p>}
    </div>
  );
};

export default AbsenceItem;
