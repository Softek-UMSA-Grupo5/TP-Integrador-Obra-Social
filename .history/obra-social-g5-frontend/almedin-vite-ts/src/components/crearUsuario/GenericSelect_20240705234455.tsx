import React, { useEffect } from 'react';
import { FormControl, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface GenericSelectProps<T> {
    items: T[];
    selectedItem: number | undefined;
    handleSelectChange: (event: SelectChangeEvent<number>) => void;
    itemLabel: (item: T) => string;
    label: string;
}

const GenericSelect = <T extends { id: number },>({ 
    items, 
    selectedItem, 
    handleSelectChange, 
    itemLabel, 
    //label 
}: GenericSelectProps<T>) => {
    useEffect(() => {
        if (!selectedItem && items.length > 0) {
            handleSelectChange({
                target: {
                    value: items[0].id,
                },
            } as SelectChangeEvent<number>);
        }
    }, [items, selectedItem, handleSelectChange]);

    return (
        <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ my: 1.5 }}>
                <Select
                    value={selectedItem ?? ''}
                    onChange={handleSelectChange}
                    fullWidth
                    variant="outlined"
                    sx={{ width: '100%' }}
                >
                    {items.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {itemLabel(item)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default GenericSelect;
