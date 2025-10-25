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
import { formatDateTime } from '../utils';

type State = {
  id: number;
  name?: string;
  alias?: string[];
  country?: { name: string };
  created_at?: string;
  updated_at?: string;
};

export default function States() {
  const [items, setItems] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<State[]>('/state');
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
      item.alias?.some((a) => a.toLowerCase().includes(searchTerm)) ||
      item.country?.name?.toLowerCase().includes(searchTerm)
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
        <CardHeader title={loading ? 'States (loading...)' : `States (${filteredItems.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Alias</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={5} />
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState message="No states found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.name || '-'}</TableCell>
                  <TableCell>{item.alias?.join(', ') || '-'}</TableCell>
                  <TableCell>{item.country?.name || '-'}</TableCell>
                  <TableCell>{formatDateTime(item.created_at)}</TableCell>
                  <TableCell>{formatDateTime(item.updated_at)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
