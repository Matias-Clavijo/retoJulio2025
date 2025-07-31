import React, { useState } from "react";
import {
    Box,
    Alert,
    IconButton,
    Drawer,
    useMediaQuery,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Skeleton
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
                <Card key={i} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
                    <Box height={"0.7rem"} sx={{ backgroundColor: '#F5C518', borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                    <CardContent sx={{ px: 2, pt: 2 }}>
                        {columns
                            .filter(col => col.id !== 'acciones')
                            .map(col => (
                                <Box key={col.id} sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight="bold"
                                        sx={{ fontSize: '1rem', color: '#0B2240' }}
                                    >
                                        {col.label}:
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: '1rem',
                                            textAlign: 'left',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            gap: 1,
                                            maxWidth: '100%'
                                        }}
                                    >
                                        {col.format ? col.format(row[col.id], row) : row[col.id]}
                                    </Typography>
                                </Box>
                            ))}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                        <Box display="flex" gap={1}>
                            {row.acciones}
                        </Box>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ p: 2 }}>
                    <Skeleton height={50} width="60%" sx={{ mb: 2 }} />
                    <Skeleton height={20} width="40%" sx={{ mb: 4 }} />
                    {[...Array(1)].map((_, i) => (
                        <Skeleton
                            key={i}
                            variant="rounded"
                            height={"45rem"}
                            sx={{ mb: 2 }}
                        />
                    ))}
                </Box>
            );
        }

        if (error) {
            return <Box sx={{ p: 2 }}><Alert severity="error">{error}</Alert></Box>;
        }

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
            <Box sx={{ margin: '0 auto', width: '100%' }}>
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
