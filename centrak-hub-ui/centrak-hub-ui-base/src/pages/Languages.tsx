import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material';
import { get } from '../api/client';

type Language = { id: number; name: string; code?: string };

export default function Languages() {
  const [items, setItems] = useState<Language[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await get<Language[]>('/language');
        setItems(data || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
      }
    })();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Card>
        <CardHeader title={`Languages (${items.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((l) => (
              <TableRow key={l.id} hover>
                <TableCell>{l.id}</TableCell>
                <TableCell>{l.name}</TableCell>
                <TableCell>{l.code || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

