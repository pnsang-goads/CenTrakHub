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
} from '@mui/material';
import { get } from '../api/client';
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';
import { formatMoney, formatNumber } from '../utils';

type MaintenanceItem = {
  id: number;
  name?: string;
  user?: { name: string };
  maintenances_count?: number;
  amount_net_min?: number;
  amount_net_max?: number;
  amount_net_avg?: number;
  quantity_sum?: number;
  total_sum?: number;
};

export default function MaintenanceItems() {
  const [items, setItems] = useState<MaintenanceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<MaintenanceItem[]>('/maintenance-item');
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
    return item.name?.toLowerCase().includes(searchTerm) || item.user?.name?.toLowerCase().includes(searchTerm);
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
        <CardHeader title={loading ? 'Maintenance Items (loading...)' : `Maintenance Items (${filteredItems.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Maintenances</TableCell>
              <TableCell align="right">Min Amount</TableCell>
              <TableCell align="right">Max Amount</TableCell>
              <TableCell align="right">Avg Amount</TableCell>
              <TableCell align="right">Total Quantity</TableCell>
              <TableCell align="right">Total Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={8} />
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState message="No maintenance items found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.user?.name || '-'}</TableCell>
                  <TableCell>{item.name || '-'}</TableCell>
                  <TableCell align="right">{formatNumber(item.maintenances_count, 0)}</TableCell>
                  <TableCell align="right">{formatMoney(item.amount_net_min)}</TableCell>
                  <TableCell align="right">{formatMoney(item.amount_net_max)}</TableCell>
                  <TableCell align="right">{formatMoney(item.amount_net_avg)}</TableCell>
                  <TableCell align="right">{formatNumber(item.quantity_sum, 0)}</TableCell>
                  <TableCell align="right">{formatMoney(item.total_sum)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
