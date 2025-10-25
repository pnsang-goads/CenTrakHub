import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert, TextField, Stack, Button } from '@mui/material';
import { get } from '../api/client';
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';
import { formatDate, formatNumber } from '../utils';

type Refuel = {
  id: number;
  liters?: number;
  cost?: number;
  date_at?: string;
  vehicle?: { id: number; name: string } | null;
  user?: { id: number; name: string } | null;
};

export default function Refuels() {
  const [items, setItems] = useState<Refuel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState<string>('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (vehicleId) qs.set('vehicle_id', vehicleId);
      const data = await get<Refuel[]>(`/refuel${qs.toString() ? `?${qs.toString()}` : ''}`);
      setItems(data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <ApiKeyInput onSave={load} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />
        <Button variant="outlined" onClick={load}>
          Filter
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardHeader title={loading ? 'Refuels (loading...)' : `Refuels (${items.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Liters</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={6} />
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState message="No refuels found" />
                </TableCell>
              </TableRow>
            ) : (
              items.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{formatDate(r.date_at)}</TableCell>
                  <TableCell align="right">{formatNumber(r.liters, 2)}</TableCell>
                  <TableCell align="right">{formatNumber(r.cost, 2)}</TableCell>
                  <TableCell>{r.vehicle?.name || '-'}</TableCell>
                  <TableCell>{r.user?.name || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
