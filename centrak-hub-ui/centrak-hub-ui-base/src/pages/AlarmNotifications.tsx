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
  Tooltip,
} from '@mui/material';
import { get } from '../api/client';
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';
import { formatDateTime, truncateText } from '../utils';

type AlarmNotification = {
  id: number;
  name?: string;
  message?: string;
  type?: string;
  date_at?: string;
  closed_at?: string | null;
  dashboard?: boolean;
  telegram?: boolean;
  user?: { name: string };
  vehicle?: { id: number; name: string };
  alarm?: { id: number; name: string };
  trip?: { id: number; name: string };
};

export default function AlarmNotifications() {
  const [items, setItems] = useState<AlarmNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<AlarmNotification[]>('/alarm-notification');
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
      item.message?.toLowerCase().includes(searchTerm) ||
      item.type?.toLowerCase().includes(searchTerm) ||
      item.user?.name?.toLowerCase().includes(searchTerm) ||
      item.vehicle?.name?.toLowerCase().includes(searchTerm) ||
      item.alarm?.name?.toLowerCase().includes(searchTerm)
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
        <CardHeader
          title={loading ? 'Alarm Notifications (loading...)' : `Alarm Notifications (${filteredItems.length})`}
        />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Alarm</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Trip</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Dashboard</TableCell>
              <TableCell>Telegram</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={10} />
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <EmptyState message="No alarm notifications found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.user?.name || '-'}</TableCell>
                  <TableCell>{item.vehicle?.name || '-'}</TableCell>
                  <TableCell>{item.type || item.alarm?.name || '-'}</TableCell>
                  <TableCell>
                    <Tooltip title={item.name || ''}>
                      <span
                        style={{
                          display: 'block',
                          maxWidth: 150,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {truncateText(item.name, 30)}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={item.message || ''}>
                      <span
                        style={{
                          display: 'block',
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {truncateText(item.message, 40)}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{item.trip?.name || '-'}</TableCell>
                  <TableCell>{formatDateTime(item.date_at)}</TableCell>
                  <TableCell>
                    <Chip label={item.dashboard ? 'Yes' : 'No'} color={item.dashboard ? 'success' : 'default'} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={item.telegram ? 'Yes' : 'No'} color={item.telegram ? 'success' : 'default'} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={item.closed_at ? 'Closed' : 'Open'} color={item.closed_at ? 'default' : 'warning'} size="small" />
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
