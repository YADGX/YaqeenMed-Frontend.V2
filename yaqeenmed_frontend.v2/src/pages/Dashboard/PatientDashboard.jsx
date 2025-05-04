import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { StatsCard, RecentIssues } from './components';
import { getPatientDashboard } from '../../services/patientService';

export default function PatientDashboard() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatientDashboard();
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StatsCard 
              title="Medical Issues" 
              value={data.issuesCount}
            />
          </Grid>
          <Grid item xs={12}>
            <RecentIssues data={data.recentIssues} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}