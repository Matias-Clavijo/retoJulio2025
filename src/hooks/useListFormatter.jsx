import React, { useState } from 'react';
import {
    Box,
    Chip,
    Popover,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';

export const useListFormatter = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverItems, setPopoverItems] = useState([]);
    const [popoverTitle, setPopoverTitle] = useState('');

    const handlePopoverOpen = (event, items, title) => {
        setAnchorEl(event.currentTarget);
        setPopoverItems(items);
        setPopoverTitle(title);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const formatList = (items, options = {}) => {
        const {
            maxVisible = 2,
            showChips = true,
            listTitle = 'Ver todos los elementos',
            separator = ', '
        } = options;

        if (!Array.isArray(items) || items.length === 0) {
            return '-';
        }

        // Si mostrar como chips
        if (showChips) {
            const visibleItems = items.slice(0, maxVisible);
            const hiddenItems = items.slice(maxVisible);

            return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: 0.5, alignItems: 'center' }}>
                    {visibleItems.map((item) => (
                        <Typography variant="body2">{item}</Typography> 
                    ))}
                    
                    {hiddenItems.length > 0 && (
                        <>
                            <Chip
                                label={`+${hiddenItems.length} más`}
                                size="small"
                                variant="outlined"
                                sx={{ cursor: 'pointer' }}
                                onClick={(event) => handlePopoverOpen(event, items, listTitle)}
                            />
                            
                            <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Box sx={{ p: 2, maxWidth: 300 }}>
                                    <Typography variant="subtitle2" sx={{fontWeight: 600 }}>
                                        {popoverTitle}
                                    </Typography>
                                    <List dense>
                                        {popoverItems.map((item, index) => (
                                            <ListItem key={index} sx={{ py: 0.25 }}>
                                                <ListItemText 
                                                    primary={item}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Popover>
                        </>
                    )}
                </Box>
            );
        }

        // Si mostrar como texto simple
        const visibleItems = items.slice(0, maxVisible);
        const hiddenItems = items.slice(maxVisible);
        
        let text = visibleItems.join(separator);
        
        if (hiddenItems.length > 0) {
            text += ` y ${hiddenItems.length} más`;
        }
        
        return text;
    };

    return {
        formatList
    };
}; 