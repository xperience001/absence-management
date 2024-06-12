import React, { useState, useEffect } from 'react';

interface ConflictCheckerProps {
  absences: Absence[];
}

interface Absence {
  id: number;
  startDate: string;
  endDate: string;
}

const ConflictChecker: React.FC<ConflictCheckerProps> = ({ absences }) => {
  const [conflict, setConflict] = useState<boolean>(false);

  useEffect(() => {
    if (absences.length >= 2) {
      const hasConflict = absences.some((absence1, index) => {
        for (let i = index + 1; i < absences.length; i++) {
          const absence2 = absences[i];
          if (checkConflict(absence1, absence2)) {
            return true;
          }
        }
        return false;
      });
      setConflict(hasConflict);
    } else {
      setConflict(false);
    }
  }, [absences]);

  const checkConflict = (absence1: Absence, absence2: Absence): boolean => {
    const startDate1 = new Date(absence1.startDate).getTime();
    const endDate1 = new Date(absence1.endDate).getTime();
    const startDate2 = new Date(absence2.startDate).getTime();
    const endDate2 = new Date(absence2.endDate).getTime();

    return startDate1 < endDate2 && endDate1 > startDate2;
  };

  return <>{conflict ? <p style={{ fontWeight: 'bold', color: 'red' }}>Conflict detected!</p> : <p style={{ fontWeight: 'bold', color: 'green' }}>No conflicts</p>}</>;
};

export default ConflictChecker;
