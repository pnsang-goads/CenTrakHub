import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert, TextField, Stack, Button } from '@mui/material';
import { get } from '../api/client';

type Device = {
  id: number;
  code?: string;
  name?: string;
  model?: string;
  serial?: string;
  phone_number?: string;
  enabled?: boolean;
  shared?: boolean;
  shared_public?: boolean;
  vehicle?: { id: number; name: string } | null;
};

export default function Devices() {
  const [items, setItems] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('apiKey') || '');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<Device[]>('/device');
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

  const saveApiKey = () => {
    localStorage.setItem('apiKey', apiKey.trim());
    load();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="API Key (Bearer UUID)"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Button variant="contained" onClick={saveApiKey}>Save Key</Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardHeader title={loading ? 'Devices (loading...)' : `Devices (${items.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Serial</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Vehicle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((d) => (
              <TableRow key={d.id} hover>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.name || '-'}</TableCell>
                <TableCell>{d.model || '-'}</TableCell>
                <TableCell>{d.serial || '-'}</TableCell>
                <TableCell>{d.phone_number || '-'}</TableCell>
                <TableCell>{d.enabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>{d.vehicle?.name || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

