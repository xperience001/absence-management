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
  onEmployeeClick: (name: string) => void;
  onAbsenceClick: (absence: Absence) => void;
}

const AbsenceItem: React.FC<AbsenceItemProps> = ({ absence, fetchConflict, onEmployeeClick, onAbsenceClick }) => {
  const [hasConflict, setHasConflict] = useState<boolean>(false);

  useEffect(() => {
    const getConflictStatus = async () => {
      const conflictStatus = await fetchConflict(absence.id);
      setHasConflict(conflictStatus);
    };
    getConflictStatus();
  }, [absence.id, fetchConflict]);

  return (
    <div style={{ display: 'flex', justifyContent:'space-between', border: '1px solid #ccc', borderRadius: '5px', padding: '15px', marginBottom: '20px', cursor: 'pointer', transition: 'all 0.3s' }}>
      <div>
      <div style={{ fontWeight: 'bold', fontSize: '25px', marginBottom: '0.5rem', fontFamily: 'Arial, sans-serif' }} onClick={() => onEmployeeClick(absence.employeeName)}>{absence.employeeName}</div>
      {/* <div>Start Date: {absence.startDate}</div>
      <div>End Date: {absence.endDate}</div> */}
      <div>Type: {absence.absenceType}</div>
      <div>Status: {absence.approved ? 'Approved' : 'Pending'}</div>
      </div>
      <div>
      <button
  onClick={() => onAbsenceClick(absence)}
  style={{
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  }}
>
  View Details
</button>
      </div>

    </div>
  );
};

export default AbsenceItem;