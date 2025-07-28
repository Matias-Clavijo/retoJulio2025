import React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function SalesDashboard({ totalIncome = 278912, salesData = [] }) {
  // Procesar los datos de ventas para el gráfico (cantidad inferida por fecha)
  const fechaCounts = {};
  
  // Contar ocurrencias por fecha
  salesData.forEach(sale => {
    const fecha = sale.fecha;
    if (fechaCounts[fecha]) {
      fechaCounts[fecha]++;
    } else {
      fechaCounts[fecha] = 1;
    }
  });
  
  // Convertir a formato para el gráfico y ordenar cronológicamente
  const chartData = Object.entries(fechaCounts)
    .map(([fecha, cantidad]) => ({
      name: fecha,
      value: cantidad,
      dateObj: new Date(fecha.split('/').reverse().join('-'))
    }))
    .sort((a, b) => a.dateObj - b.dateObj);
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
      <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Gráfico */}
        <Grid item xs={12} md={9} style={{ width: '80%' }}>
          <Box sx={{ height: 200 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#666', fontSize: '0.9rem' }}>
              Ventas por Fecha
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#666' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                  label={{ value: 'Número de Ventas', angle: -90, position: 'insideLeft' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

                {/* Métricas */}
        <Grid item xs={12} md={3} style={{ width: '15%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            {/* Income Card */}
            <Card sx={{ backgroundColor: '#e3f2fd', border: '1px solid #90caf9' }}>
              <CardContent sx={{ p: 3, textAlign: 'center', '&:last-child': { pb: 3 } }}>
                <Typography variant="caption" sx={{ color: '#666', fontWeight: 'bold', display: 'block', mb: 1 }}>
                  INCOME
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 2 }}>
                  You sold an extra $27.67
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                  ${totalIncome.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ 
                    backgroundColor: '#4caf50', 
                    color: 'white', 
                    px: 2, 
                    py: 1, 
                    borderRadius: 1,
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    +970%
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
} 