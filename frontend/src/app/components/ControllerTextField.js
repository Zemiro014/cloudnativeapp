import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export function ControllerTextField({ name, label, rules, control, errors }) {
    return (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
            <TextField
                {...field}
                label={label}
                variant="outlined"
                fullWidth
                margin="normal"
                error={Boolean(errors)}
                helperText={errors ? `${label} is required` : ''}
            >
            </TextField>
        )}
    />
    )
}