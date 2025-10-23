import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert, Stack, TextField, Button, Typography } from '@mui/material';
import { get } from '../api/client';

type User = {
  id: number;
  name: string;
  email: string;
  admin?: boolean;
  manager?: boolean;
  enabled?: boolean;
  api_key_enabled?: boolean;
};

export default function Users() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('apiKey') || '');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get<User[]>('/user');
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
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField fullWidth size="small" label="API Key (Bearer UUID)" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <Button variant="contained" onClick={saveApiKey}>Save Key</Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          <Typography component="div" variant="caption" sx={{ display: 'block' }}>
            Lưu ý: Endpoint Users yêu cầu admin-mode. Hãy bật Admin Mode trong UI Laravel trước khi gọi.
          </Typography>
        </Alert>
      )}

      <Card>
        <CardHeader title={loading ? 'Users (loading...)' : `Users (${items.length})`} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>API Key Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.admin ? 'Yes' : 'No'}</TableCell>
                <TableCell>{u.manager ? 'Yes' : 'No'}</TableCell>
                <TableCell>{u.enabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>{u.api_key_enabled ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

