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
  TableFooter,
  Typography,
} from '@mui/material';
import { get } from '../api/client';
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';
import { formatDate, formatDistance, formatMoney } from '../utils';

type Maintenance = {
  id: number;
  name?: string;
  workshop?: string;
  date_at?: string;
  distance?: number;
  distance_next?: number;
  amount?: number;
  user?: { name: string };
  vehicle?: { name: string };
};

type MaintenanceResponse = {
  list: Maintenance[];
  total?: number;
};

export default function Maintenances() {
  const [items, setItems] = useState<Maintenance[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<MaintenanceResponse | Maintenance[]>('/maintenance');
      if (Array.isArray(data)) {
        setItems(data);
        setTotal(0);
      } else {
        setItems(data?.list || []);
        setTotal(data?.total || 0);
      }
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
      item.workshop?.toLowerCase().includes(searchTerm) ||
      item.user?.name?.toLowerCase().includes(searchTerm) ||
      item.vehicle?.name?.toLowerCase().includes(searchTerm)
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
        <CardHeader title={loading ? 'Maintenances (loading...)' : `Maintenances (${filteredItems.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Workshop</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Distance</TableCell>
              <TableCell align="right">Next Distance</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={8} />
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState message="No maintenances found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.user?.name || '-'}</TableCell>
                  <TableCell>{item.vehicle?.name || '-'}</TableCell>
                  <TableCell>{item.name || '-'}</TableCell>
                  <TableCell>{item.workshop || '-'}</TableCell>
                  <TableCell>{formatDate(item.date_at)}</TableCell>
                  <TableCell align="right">{formatDistance(item.distance)}</TableCell>
                  <TableCell align="right">{formatDistance(item.distance_next)}</TableCell>
                  <TableCell align="right">{formatMoney(item.amount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {total > 0 && !loading && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} align="right">
                  <Typography variant="subtitle2" fontWeight="bold">
                    Total:
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight="bold">
                    {formatMoney(total)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </Card>
    </Container>
  );
}
