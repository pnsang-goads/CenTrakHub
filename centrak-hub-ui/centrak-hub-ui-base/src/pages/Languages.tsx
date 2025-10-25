import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert, TextField } from '@mui/material';
import { get } from '../api/client';
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';

type Language = {
  id: number;
  code?: string;
  name?: string;
};

export default function Languages() {
  const [items, setItems] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<Language[]>('/language');
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
    return item.code?.toLowerCase().includes(searchTerm) || item.name?.toLowerCase().includes(searchTerm);
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
        <CardHeader title={loading ? 'Languages (loading...)' : `Languages (${filteredItems.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={2} />
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <EmptyState message="No languages found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.code || '-'}</TableCell>
                  <TableCell>{item.name || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
