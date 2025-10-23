import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert, TextField, Stack, Button } from '@mui/material';
import { get } from '../api/client';

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
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('apiKey') || '');
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

  useEffect(() => { load(); }, []);

  const saveApiKey = () => {
    localStorage.setItem('apiKey', apiKey.trim());
    load();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField fullWidth size="small" label="API Key (Bearer UUID)" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <Button variant="contained" onClick={saveApiKey}>Save Key</Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField size="small" label="Vehicle ID" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} />
        <Button variant="outlined" onClick={load}>Filter</Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card>
        <CardHeader title={loading ? 'Refuels (loading...)' : `Refuels (${items.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Liters</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.date_at || '-'}</TableCell>
                <TableCell>{r.liters ?? '-'}</TableCell>
                <TableCell>{r.cost ?? '-'}</TableCell>
                <TableCell>{r.vehicle?.name || '-'}</TableCell>
                <TableCell>{r.user?.name || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

