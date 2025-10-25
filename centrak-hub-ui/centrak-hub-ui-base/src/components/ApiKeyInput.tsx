import { useState } from 'react';
import { Stack, TextField, Button, Alert, Collapse } from '@mui/material';

type ApiKeyInputProps = {
  onSave?: () => void;
};

export default function ApiKeyInput({ onSave }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('apiKey') || '');
  const [showSuccess, setShowSuccess] = useState(false);

  const saveApiKey = () => {
    localStorage.setItem('apiKey', apiKey.trim());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    if (onSave) onSave();
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="API Key (Bearer UUID)"
          placeholder="Enter your API key here"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type="password"
        />
        <Button variant="contained" onClick={saveApiKey} sx={{ minWidth: 100 }}>
          Save Key
        </Button>
      </Stack>
      <Collapse in={showSuccess}>
        <Alert severity="success" sx={{ mb: 2 }}>
          API Key saved successfully!
        </Alert>
      </Collapse>
    </>
  );
}

