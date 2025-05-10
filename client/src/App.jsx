import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Divider,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { 
  Thermostat, 
  Opacity, 
  Grass, 
  DeviceThermostat,
  Air,
  WaterDrop
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Custom theme colors
const theme = {
  temperature: '#FF6B6B',
  humidity: '#4ECDC4',
  soil: '#6B6BFF',
  background: '#f9f9f9'
};

function SensorCard({ icon, title, value, unit, color, max = 100 }) {
  const progressValue = Math.min((value / max) * 100, 100);

  return (
    <Card 
      component={motion.div}
      whileHover={{ scale: 1.03 }}
      sx={{ 
        borderRadius: 4,
        boxShadow: 3,
        background: 'white',
        height: '100%'
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: `${color}20`,
              color: color,
              display: 'flex'
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value} {unit && <small style={{ fontSize: '0.6em', opacity: 0.7 }}>{unit}</small>}
            </Typography>
          </Box>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={progressValue} 
          sx={{ 
            height: 8,
            borderRadius: 4,
            backgroundColor: `${color}20`,
            '& .MuiLinearProgress-bar': {
              backgroundColor: color
            }
          }} 
        />
        
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="text.secondary">0{unit}</Typography>
          <Typography variant="caption" color="text.secondary">{max}{unit}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [sensorData, setSensorData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setSensorData(newData);
      setHistory(prev => [...prev.slice(-14), newData]); // Keep last 15 readings
      setLoading(false);
    };

    ws.onerror = () => {
      setLoading(false);
    };

    return () => ws.close();
  }, []);

  // Chart data configuration
  const chartData = {
    labels: history.map((_, i) => `${i * 0.5} min`),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: history.map(d => d.temperature),
        borderColor: theme.temperature,
        backgroundColor: `${theme.temperature}20`,
        tension: 0.4,
        fill: true,
        yAxisID: 'y'
      },
      {
        label: 'Humidity (%)',
        data: history.map(d => d.humidity),
        borderColor: theme.humidity,
        backgroundColor: `${theme.humidity}20`,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1'
      },
      {
        label: 'Soil Moisture (%)',
        data: history.map(d => d.soilMoisture),
        borderColor: theme.soil,
        backgroundColor: `${theme.soil}20`,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1'
      }
    ]
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        flexDirection="column"
        gap={3}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography>Connecting to Arduino...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      maxWidth: '100vw', 
      margin: '0 auto',
      background: theme.background,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 800,
          mb: 4,
          background: 'linear-gradient(45deg, #FF6B6B, #6B6BFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Smart irrigation Dashboard
      </Typography>

      {/* Sensor Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <SensorCard
            icon={<Thermostat sx={{ fontSize: 30 }} />}
            title="Temperature"
            value={sensorData?.temperature?.toFixed(1) || '--'}
            unit="°C"
            color={theme.temperature}
            max={50}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SensorCard
            icon={<Opacity sx={{ fontSize: 30 }} />}
            title="Humidity"
            value={sensorData?.humidity?.toFixed(1) || '--'}
            unit="%"
            color={theme.humidity}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SensorCard
            icon={<Grass sx={{ fontSize: 30 }} />}
            title="Soil Moisture"
            value={sensorData?.soilMoisture || '--'}
            unit="%"
            color={theme.soil}
          />
        </Grid>
      </Grid>

      {/* History Chart */}
      <Card sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 4,
        boxShadow: 3,
        background: 'white'
      }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Sensor History (Last 15 Readings)
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ height: 400 }}>
          <Line 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false
              },
              scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Temperature (°C)'
                  },
                  grid: {
                    drawOnChartArea: false
                  }
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Humidity/Moisture (%)'
                  },
                  grid: {
                    drawOnChartArea: false
                  },
                  min: 0,
                  max: 100
                }
              },
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    usePointStyle: true,
                    padding: 20
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  padding: 12,
                  usePointStyle: true
                }
              }
            }}
          />
        </Box>
      </Card>

      {/* Status Bar */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        p: 1,
        boxShadow: 3,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Typography variant="body2" color="text.secondary">
          Last update: {sensorData ? new Date().toLocaleTimeString() : '--'}
        </Typography>
      </Box>
    </Box>
  );
}
