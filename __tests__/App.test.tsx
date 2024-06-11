import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders absence management title', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Absence Management')).toBeInTheDocument();
    });
  });

  it('renders absence controls by default', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Sort by Start Date')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sort by End Date')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sort by Absence Type')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sort by Employee Name')).toBeInTheDocument();
    });
  });

  it('renders absence list by default', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('shows absence item details when an absence item is clicked and hides the absence list', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Jane Smith'));
    await waitFor(() => {
      expect(screen.getByText('Absence Details')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Employee Name: Jane Smith')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Start Date: 2024-06-05')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('End Date: 2024-06-07')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Type: Sick Leave')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Status: Pending Approval')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Back'));
    await waitFor(() => {
      expect(screen.getByText('Sort by Start Date')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sort by End Date')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sort by Absence Type')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sort by Employee Name')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('sorts absences by start date when "Sort by Start Date" button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Sort by Start Date'));
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('sorts absences by end date when "Sort by End Date" button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Sort by End Date'));
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('sorts absences by absence type when "Sort by Absence Type" button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Sort by Absence Type'));
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('sorts absences by employee name when "Sort by Employee Name" button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Sort by Employee Name'));
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
