// src/App.tsx
import React, { useState, useEffect } from 'react';
import AbsenceControls from './components/AbsenceControls';
import AbsenceList from './components/AbsenceList';

interface Absence {
  id: number;
  startDate: string;
  endDate: string;
  employeeName: string;
  approved: boolean;
  absenceType: string;
}

const App: React.FC = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [sortedBy, setSortedBy] = useState<string | null>(null);
  const [sortedAsc, setSortedAsc] = useState<boolean>(true);

  useEffect(() => {
    const fetchAbsences = async () => {
      const response = await fetch('https://front-end-kata.brighthr.workers.dev/api/absences');
      const data = await response.json();
      const transformedData = data.map((item: any) => ({
        id: item.id,
        startDate: item.startDate,
        endDate: new Date(new Date(item.startDate).getTime() + item.days * 86400000).toISOString(),
        employeeName: `${item.employee.firstName} ${item.employee.lastName}`,
        approved: item.approved,
        absenceType: item.absenceType
      }));
      setAbsences(transformedData);
    };
    fetchAbsences();
  }, []);

  const fetchConflict = async (id: number): Promise<boolean> => {
    const response = await fetch(`https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`);
    const data = await response.json();
    return data.conflict;
  };

  const handleSort = (field: string) => {
    setSortedBy(field);
    setSortedAsc(!sortedAsc);
  };

  const sortFunction = (a: Absence, b: Absence): number => {
    if (sortedBy) {
      if (a[sortedBy as keyof Absence] < b[sortedBy as keyof Absence]) return sortedAsc ? -1 : 1;
      if (a[sortedBy as keyof Absence] > b[sortedBy as keyof Absence]) return sortedAsc ? 1 : -1;
    }
    return 0;
  };

  const handleEmployeeClick = (employeeName: string) => {
    const employeeAbsences = absences.filter(absence => absence.employeeName === employeeName);
    setAbsences(employeeAbsences);
  };

  return (
    <div className="App">
      <h1>Absence Management</h1>
      <AbsenceControls onSort={handleSort} />
      <AbsenceList
        absences={absences.sort(sortFunction)}
        fetchConflict={fetchConflict}
        onEmployeeClick={handleEmployeeClick}
      />
    </div>
  );
};

export default App;
