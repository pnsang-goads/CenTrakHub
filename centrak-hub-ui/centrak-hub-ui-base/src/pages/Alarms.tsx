import { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  TextField,
  Chip,
} from '@mui/material';
import { get } from '../api/client';
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';
import { formatDateTime } from '../utils';

type Alarm = {
  id: number;
  type?: string;
  name?: string;
  user?: { name: string };
  vehicles_count?: number;
  notifications_count?: number;
  notifications_pending_count?: number;
  created_at?: string;
  dashboard?: boolean;
  telegram?: boolean;
  enabled?: boolean;
};

export default function Alarms() {
  const [items, setItems] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<Alarm[]>('/alarm');
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

  const filteredItems = items.filter((item) => {
    if (!filter) return true;
    const searchTerm = filter.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchTerm) ||
      item.type?.toLowerCase().includes(searchTerm) ||
      item.user?.name?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <ApiKeyInput onSave={load} />

      <TextField
        fullWidth
        size="small"
        label="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardHeader title={loading ? 'Alarms (loading...)' : `Alarms (${filteredItems.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Vehicles</TableCell>
              <TableCell>Notifications</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Dashboard</TableCell>
              <TableCell>Telegram</TableCell>
              <TableCell>Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={9} />
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <EmptyState message="No alarms found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.type || '-'}</TableCell>
                  <TableCell>{item.name || '-'}</TableCell>
                  <TableCell>{item.user?.name || '-'}</TableCell>
                  <TableCell>{item.vehicles_count || 0}</TableCell>
                  <TableCell>
                    {item.notifications_count !== undefined
                      ? `${item.notifications_count}${
                          item.notifications_pending_count ? `/${item.notifications_pending_count}` : ''
                        }`
                      : '-'}
                  </TableCell>
                  <TableCell>{formatDateTime(item.created_at)}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.dashboard ? 'Yes' : 'No'}
                      color={item.dashboard ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.telegram ? 'Yes' : 'No'}
                      color={item.telegram ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.enabled ? 'Enabled' : 'Disabled'}
                      color={item.enabled ? 'success' : 'default'}
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
