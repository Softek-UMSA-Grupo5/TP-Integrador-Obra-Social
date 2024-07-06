import { useEffect } from 'react';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { HorarioDiaSemanaEnum } from '../../assets/models/Horario';

interface GenericSelectProps<T> {
    items: T[];
    selectedItem: T | undefined;
    handleSelectChange: (value: T) => void;
    itemLabel: (item: T) => string;
    label: string;
}

const GenericSelect = <T extends string | number | HorarioDiaSemanaEnum>({ 
    items, 
    selectedItem, 
    handleSelectChange, 
    itemLabel, 
    //label 
}: GenericSelectProps<T>) => {
    useEffect(() => {
        if (!selectedItem && items.length > 0) {
            handleSelectChange(items[0]);
        }
    }, [items, selectedItem, handleSelectChange]);

    return (
        <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ my: 4 }}>
                <Select
                    value={selectedItem ?? ''}
                    onChange={(event) => handleSelectChange(event.target.value as T)}
                    fullWidth
                    variant="outlined"
                    sx={{ width: '100%', maxHeight: 40 }}
                >
                    {items.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            {itemLabel(item)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default GenericSelect;
