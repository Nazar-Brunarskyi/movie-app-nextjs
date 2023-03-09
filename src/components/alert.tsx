import { Alert, AlertColor } from '@mui/material';
import { FC, memo } from 'react';

interface Props {
  text: string
  type?: AlertColor
}

export const CustomAlert: FC<Props> = memo(
  ({ text, type }) => {
    return (
      <Alert
        severity={type}
        sx={{
          maxWidth: '80%',
          margin: 'auto'
        }}
      >
        {text}
      </Alert>
    );
  },
);
