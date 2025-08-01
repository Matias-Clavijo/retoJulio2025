import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  useMediaQuery
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function SalesDashboard({ totalIncome = 278912, salesData = [] }) {
  const isMobile = useMediaQuery('(max-width:768px)');

  // Agrupar y contar ventas por fecha
  const fechaCounts = {};
  salesData.forEach((sale) => {
    const fecha = sale.fecha;
    fechaCounts[fecha] = (fechaCounts[fecha] || 0) + 1;
  });

  const chartData = Object.entries(fechaCounts)
      .map(([fecha, cantidad]) => ({
        name: fecha,
        value: cantidad,
        dateObj: new Date(fecha.split('/').reverse().join('-'))
      }))
      .sort((a, b) => a.dateObj - b.dateObj);

  // === Vista para MOBILE ===
  if (isMobile) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
          <Paper elevation={2} sx={{ p: 2, height: 240 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#0B2240' }}>
              Ventas por Fecha
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-35} textAnchor="end" height={60} tick={{ fontSize: 10, fill: '#666' }}/>
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0B2240" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
          <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: 'center',
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#0B2240' }}>
              INCOME
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              You sold an extra $27.67
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0B2240' }}>
              ${totalIncome.toLocaleString()}
            </Typography>
            <Box
                sx={{
                  backgroundColor: '#0B2240',
                  color: 'white',
                  borderRadius: 1,
                  fontSize: 14,
                  fontWeight: 'bold',
                  px: 1.5,
                  mt: 1
                }}
            >
              +970%
            </Box>
          </Paper>
        </Box>
    );
  }

  // === Vista para ESCRITORIO ===
  return (
      <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
        <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Gráfico */}
          <Grid item xs={12} md={9} style={{ width: '80%' }}>
            <Box sx={{ height: 200 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#0B2240', fontSize: '0.9rem' }}>
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
                      stroke="#0B2240"
                      strokeWidth={2}
                      dot={{ fill: '#0B2240', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Income card */}
          <Grid item xs={12} md={3} style={{ width: '15%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #0B2240' }}>
                <CardContent sx={{ p: 3, textAlign: 'center', '&:last-child': { pb: 3 } }}>
                  <Typography
                      variant="caption"
                      sx={{ color: '#0B2240', fontWeight: 'bold', display: 'block', mb: 1 }}
                  >
                    INCOME
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#0B2240', display: 'block', mb: 2 }}>
                    You sold an extra $27.67
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0B2240', mb: 2 }}>
                    ${totalIncome.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        sx={{
                          backgroundColor: '#0B2240',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}
                    >
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
