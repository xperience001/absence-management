// components/AbsenceItemDetails.tsx
import React, { useState, useEffect } from 'react';

interface Absence {
  id: number;
  startDate: string;
  endDate: string;
  employeeName: string;
  approved: boolean;
  absenceType: string;
}

interface AbsenceItemDetailsProps {
  absence: Absence;
  fetchConflict: (id: number) => Promise<boolean>;
}

const AbsenceItemDetails: React.FC<AbsenceItemDetailsProps> = ({ absence, fetchConflict }) => {
  const [hasConflict, setHasConflict] = useState<boolean | null>(null);

  useEffect(() => {
    const getConflictStatus = async () => {
      const conflictStatus = await fetchConflict(absence.id);
      setHasConflict(conflictStatus);
    };
    getConflictStatus();
  }, [absence.id, fetchConflict]);

  return (
    <div className="absence-details">
      <h2>Absence Details</h2>
      <div>
        <p>Employee Name: {absence.employeeName}</p>
        <p>Start Date: {absence.startDate}</p>
        <p>End Date: {absence.endDate}</p>
        <p>Type: {absence.absenceType}</p>
        <p>Status: {absence.approved ? 'Approved' : 'Pending Approval'}</p>
        {hasConflict !== null && (
          <p>{hasConflict ? 'Has Conflicts' : 'No Conflicts'}</p>
        )}
      </div>
    </div>
  );
};

export default AbsenceItemDetails;
