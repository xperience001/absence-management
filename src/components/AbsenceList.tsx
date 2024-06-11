// components/AbsenceList.tsx
import React from 'react';

interface Absence {
  id: number;
  startDate: string;
  endDate: string;
  employeeName: string;
  approved: boolean;
  absenceType: string;
}

interface AbsenceListProps {
  absences: Absence[];
  fetchConflict: (id: number) => Promise<boolean>;
  onEmployeeClick: (employeeName: string) => void;
  onAbsenceClick: (absence: Absence) => void;
  sortedBy: string | null;
  sortedAsc: boolean;
  sortFunction: (a: Absence, b: Absence) => number;
}

const AbsenceList: React.FC<AbsenceListProps> = ({
  absences,
  fetchConflict,
  onEmployeeClick,
  onAbsenceClick,
  sortedBy,
  sortedAsc,
  sortFunction,
}) => {
  return (
    <div>
      {absences.sort(sortFunction).map((absence) => (
        <div key={absence.id} onClick={() => onAbsenceClick(absence)} className="absence-item">
          <p>{absence.employeeName}</p>
          <p>Start Date: {absence.startDate}</p>
          <p>End Date: {absence.endDate}</p>
          <p>Type: {absence.absenceType}</p>
          <p>Status: {absence.approved ? 'Approved' : 'Pending Approval'}</p>
        </div>
      ))}
    </div>
  );
};

export default AbsenceList;
