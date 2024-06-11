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
  fetchConflict: (id: number) => Promise<boolean>; // Corrected type definition
  onEmployeeClick: (employeeName: string) => void; // Corrected type definition
  sortedBy: string | null;
  sortedAsc: boolean;
  sortFunction: (a: Absence, b: Absence) => number;
}

const AbsenceList: React.FC<AbsenceListProps> = ({
  absences,
  fetchConflict, // Corrected prop name
  onEmployeeClick, // Corrected prop name
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
          fetchConflict={fetchConflict} // Pass the correct prop name
          onEmployeeClick={onEmployeeClick} // Pass the correct prop name
        />
      ))}
    </div>
  );
};

export default AbsenceList;
