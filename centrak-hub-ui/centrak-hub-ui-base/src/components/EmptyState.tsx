import { Box, Typography } from '@mui/material';

type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({ message = 'No data available' }: EmptyStateProps) {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: 'center',
        color: 'text.secondary',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Typography variant="body2">
        Try adjusting your filters or check your API connection
      </Typography>
    </Box>
  );
}

