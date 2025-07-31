import React, { useState } from "react";
import {
    Box,
    CircularProgress,
    Alert,
    IconButton,
    Drawer,
    useMediaQuery,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CommonTable from "./common/CommonTable";
import TitleHeader from "./common/TitelHeader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "./Sidebar";

const drawerWidth = 340;

const DataManagementPage = ({
                                title,
                                description,
                                addButtonText = "Agregar",
                                addButtonIcon,
                                tableTitle,
                                columns,
                                data = [],
                                defaultRowsPerPage = 5,
                                rowsPerPageOptions = [5, 10, 25],
                                onAdd,
                                onEdit,
                                onDelete,
                                onView,
                                addDialog,
                                customActions,
                                showEditAction = true,
                                showDeleteAction = true,
                                showViewAction = false,
                                backgroundColor = '#f5f5f5',
                                loading = false,
                                error = null,
                                extraInfoComponent
                            }) => {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const toggleDrawer = () => setMobileOpen(!mobileOpen);

    const rowsWithActions = data.map((row, index) => ({
        ...row,
        acciones: customActions ? customActions(row, index) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                {showViewAction && (
                    <IconButton size="small" sx={{ color: '#0B2240' }} onClick={() => onView?.(row)}>
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                )}
                {showEditAction && (
                    <IconButton size="small" sx={{ color: '#0B2240' }} onClick={() => {
                        setSelectedItem(row);
                        onEdit ? onEdit(row) : setOpenEditDialog(true);
                    }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                )}
                {showDeleteAction && (
                    <IconButton size="small" sx={{ color: 'error.main' }} onClick={() => onDelete(row)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        )
    }));

    const handleAdd = () => onAdd ? onAdd() : setOpenAddDialog(true);
    const handleCloseAddDialog = () => setOpenAddDialog(false);
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedItem(null);
    };

    const renderMobileCards = () => (
        <Box>
            {rowsWithActions.map((row, i) => (
                <Card key={i} sx={{ mb: 2 }}>
                    <CardContent>
                        {columns
                            .filter(col => col.id !== 'acciones')
                            .map(col => (
                                <Box key={col.id} sx={{ mb: 1 }}>
                                    <Typography variant="body2" fontWeight={600}>{col.label}:</Typography>
                                    <Typography variant="body2">
                                        {col.format ? col.format(row[col.id], row) : row[col.id]}
                                    </Typography>
                                </Box>
                            ))}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'end', px: 2 }}>
                        {row.acciones}
                    </CardActions>
                </Card>
            ))}
        </Box>
    );

    const renderContent = () => {
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', height: '80vh' }}><CircularProgress /></Box>;
        if (error) return <Box sx={{ p: 2 }}><Alert severity="error">{error}</Alert></Box>;

        const actionButton = (
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#F5C518",
                    fontWeight: 600,
                    color: "#0B2240",
                    width: isMobile ? '100%' : 'auto',
                    mt: isMobile ? 2 : 0
                }}
                onClick={handleAdd}
                startIcon={addButtonIcon}
            >
                {addButtonText}
            </Button>
        );

        return (
            <Box sx={{margin: '0 auto', width: '100%' }}>
                <TitleHeader
                    title={title}
                    description={description}
                    button={!isMobile ? (
                        <Box sx={{ ml: 'auto' }}>{actionButton}</Box>
                    ) : null}
                />
                {isMobile && (
                    <Box sx={{ mb: 2 }}>{actionButton}</Box>
                )}
                {extraInfoComponent}
                {isMobile ? renderMobileCards() : (
                    <CommonTable
                        title={tableTitle}
                        columns={columns}
                        rows={rowsWithActions}
                        defaultRowsPerPage={defaultRowsPerPage}
                        rowsPerPageOptions={rowsPerPageOptions}
                    />
                )}

                {addDialog && React.cloneElement(addDialog, { open: openAddDialog, onClose: handleCloseAddDialog })}
            </Box>
        );
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: backgroundColor, height: '100vh' }}>
            {isMobile && (
                <IconButton onClick={toggleDrawer} sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1201, backgroundColor: 'white' }}>
                    <MenuIcon />
                </IconButton>
            )}

            <Box sx={{ display: { xs: 'none', md: 'block' }, width: drawerWidth, flexShrink: 0 }}>
                <Sidebar />
            </Box>
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={toggleDrawer}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: drawerWidth }
                }}
            >
                <Sidebar onClose={toggleDrawer} />
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
};

export default DataManagementPage;