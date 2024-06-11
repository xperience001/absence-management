// App.tsx
import React, { useState, useEffect } from 'react';
import './index.css'; // Importing the CSS file
import AbsenceControls from './components/AbsenceControls';
import AbsenceList from './components/AbsenceList';
import AbsenceItemDetails from './components/AbsenceItemDetails';

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
  const [selectedAbsence, setSelectedAbsence] = useState<Absence | null>(null);

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const response = await fetch('https://front-end-kata.brighthr.workers.dev/api/absences');
        const data = await response.json();
        const transformedData = data.map((item: any) => ({
          id: item.id,
          startDate: item.startDate,
          endDate: new Date(new Date(item.startDate).getTime() + item.days * 86400000).toISOString(),
          employeeName: `${item.employee.firstName} ${item.employee.lastName}`,
          approved: item.approved,
          absenceType: item.absenceType,
        }));
        setAbsences(transformedData);
      } catch (error) {
        console.error('Error fetching absences:', error);
      }
    };
    fetchAbsences();
  }, []);

  const fetchConflict = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`);
      const data = await response.json();
      return data.conflict;
    } catch (error) {
      console.error(`Error fetching conflict for absence ID ${id}:`, error);
      return false;
    }
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

  const handleAbsenceClick = (absence: Absence) => {
    setSelectedAbsence(absence);
  };

  const handleBackButtonClick = () => {
    setSelectedAbsence(null);
  };

  return (
    <div className="App">
      <h1>Absence Management</h1>
      {selectedAbsence ? (
        <>
          <AbsenceItemDetails
            absence={selectedAbsence}
            fetchConflict={fetchConflict}
          />
          <button className="back-button" onClick={handleBackButtonClick}>Back</button>
        </>
      ) : (
        <>
          <AbsenceControls onSort={handleSort} />
          <AbsenceList
            absences={absences}
            fetchConflict={fetchConflict}
            onEmployeeClick={handleEmployeeClick}
            onAbsenceClick={handleAbsenceClick}
            sortedBy={sortedBy}
            sortedAsc={sortedAsc}
            sortFunction={sortFunction}
          />
        </>
      )}
    </div>
  );
};

export default App;
