import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert, TextField, Stack, Button } from '@mui/material';
import { get } from '../api/client';

type Vehicle = {
  id: number;
  name?: string;
  plate?: string;
  enabled?: boolean;
  timezone_auto?: boolean;
  devices?: Array<{ id: number; name: string }>;
};

export default function Vehicles() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('apiKey') || '');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<Vehicle[]>('/vehicle');
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
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField fullWidth size="small" label="API Key (Bearer UUID)" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <Button variant="contained" onClick={saveApiKey}>Save Key</Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card>
        <CardHeader title={loading ? 'Vehicles (loading...)' : `Vehicles (${items.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Plate</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Devices</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id} hover>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.name || '-'}</TableCell>
                <TableCell>{v.plate || '-'}</TableCell>
                <TableCell>{v.enabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>{(v.devices || []).map((d) => d.name).join(', ') || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

