import React from 'react';
import AbsenceItem from './AbsenceItem';

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
        <AbsenceItem
          key={absence.id}
          absence={absence}
          fetchConflict={fetchConflict}
          onEmployeeClick={onEmployeeClick}
          onAbsenceClick={onAbsenceClick}
        />
      ))}
    </div>
  );
};

export default AbsenceList;