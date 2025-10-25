import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert, TextField, Stack, Button, Chip } from '@mui/material';
import { get } from '../api/client';
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';
import { formatDateTime } from '../utils';

type Trip = {
  id: number;
  code?: string;
  name?: string;
  start_at?: string;
  end_at?: string;
  distance?: number;
  distance_human?: string;
  time?: number;
  time_human?: string;
  shared?: boolean;
  shared_public?: boolean;
};

export default function Trips() {
  const [items, setItems] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ start_at: '', end_at: '' });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (filters.start_at) qs.set('start_at', filters.start_at);
      if (filters.end_at) qs.set('end_at', filters.end_at);
      const data = await get<Trip[]>(`/trip${qs.toString() ? `?${qs.toString()}` : ''}`);
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
          type="datetime-local"
          size="small"
          label="Start At"
          InputLabelProps={{ shrink: true }}
          value={filters.start_at}
          onChange={(e) => setFilters((f) => ({ ...f, start_at: e.target.value }))}
        />
        <TextField
          type="datetime-local"
          size="small"
          label="End At"
          InputLabelProps={{ shrink: true }}
          value={filters.end_at}
          onChange={(e) => setFilters((f) => ({ ...f, end_at: e.target.value }))}
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
        <CardHeader title={loading ? 'Trips (loading...)' : `Trips (${items.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Shared</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={8} />
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState message="No trips found" />
                </TableCell>
              </TableRow>
            ) : (
              items.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.name || '-'}</TableCell>
                  <TableCell>{t.code || '-'}</TableCell>
                  <TableCell>{formatDateTime(t.start_at)}</TableCell>
                  <TableCell>{formatDateTime(t.end_at)}</TableCell>
                  <TableCell>{t.distance_human ?? t.distance ?? '-'}</TableCell>
                  <TableCell>{t.time_human ?? t.time ?? '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={t.shared ? 'Yes' : 'No'}
                      color={t.shared ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
