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
  const [hasConflict, setHasConflict] = useState<boolean | null>(null);

  useEffect(() => {
    const getConflictStatus = async () => {
      const conflictStatus = await fetchConflict(absence.id);
      setHasConflict(conflictStatus);
    };
    getConflictStatus();
  }, [absence.id, fetchConflict]);

  return (
    <div>
      <div onClick={() => onEmployeeClick(absence.employeeName)}>
        <h3>{absence.employeeName}</h3>
      </div>
      <p>Start Date: {absence.startDate}</p>
      <p>End Date: {absence.endDate}</p>
      <p>Type: {absence.absenceType}</p>
      <p>Status: {absence.approved ? 'Approved' : 'Pending Approval'}</p>
      {hasConflict !== null && (
        <p>{hasConflict ? 'Has Conflicts' : 'No Conflicts'}</p>
      )}
    </div>
  );
};

export default AbsenceItem;
