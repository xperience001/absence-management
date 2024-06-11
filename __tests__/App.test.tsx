// src/__tests__/App.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from '../src/App';

test('renders App component and fetches absences', async () => {
  const { getByText, getAllByText } = render(<App />);

  await waitFor(() => {
    expect(getByText('Absence Management')).toBeInTheDocument();
    expect(getAllByText('Sort by Start Date')).toHaveLength(1);
  });
});
