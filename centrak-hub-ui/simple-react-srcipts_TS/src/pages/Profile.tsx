import { useEffect, useState } from 'react';
import { Container, Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material';
import { get } from '../api/client';

type ProfileData = {
  id: number;
  name: string;
  email: string;
  admin?: boolean;
  manager?: boolean;
  enabled?: boolean;
  api_key_enabled?: boolean;
  api_key_prefix?: string;
};

export default function Profile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      const res = await get<ProfileData>('/profile');
      setData(res || null);
    } catch (e: any) {
      setError(e.message || 'Failed to load');
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Card>
        <CardHeader title="Profile" />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>ID</TableCell><TableCell>{data?.id ?? '-'}</TableCell></TableRow>
            <TableRow><TableCell>Name</TableCell><TableCell>{data?.name ?? '-'}</TableCell></TableRow>
            <TableRow><TableCell>Email</TableCell><TableCell>{data?.email ?? '-'}</TableCell></TableRow>
            <TableRow><TableCell>Admin</TableCell><TableCell>{data?.admin ? 'Yes' : 'No'}</TableCell></TableRow>
            <TableRow><TableCell>Manager</TableCell><TableCell>{data?.manager ? 'Yes' : 'No'}</TableCell></TableRow>
            <TableRow><TableCell>Enabled</TableCell><TableCell>{data?.enabled ? 'Yes' : 'No'}</TableCell></TableRow>
            <TableRow><TableCell>API Key Enabled</TableCell><TableCell>{data?.api_key_enabled ? 'Yes' : 'No'}</TableCell></TableRow>
            <TableRow><TableCell>API Key Prefix</TableCell><TableCell>{data?.api_key_prefix ?? '-'}</TableCell></TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}

