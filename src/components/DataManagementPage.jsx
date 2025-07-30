import React, { useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import CommonTable from "./common/CommonTable";
import TitleHeader from "./common/TitelHeader";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Sidebar from "./Sidebar";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  editDialog,
  customActions,
  showEditAction = true,
  showDeleteAction = true,
  showViewAction = false,
  backgroundColor = '#f5f5f5',
  loading = false,
  error = null
}) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Add default actions to each row if not provided in customActions
  const rowsWithActions = data.map((row, index) => ({
    ...row,
    acciones: customActions ? customActions(row, index) : (
      <>
        {showEditAction && (
          <IconButton 
            size="small" 
            sx={{ color: 'primary.main' }}
            onClick={() => {
              setSelectedItem(row);
              if (onEdit) {
                onEdit(row);
              } else {
                setOpenEditDialog(true);
              }
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {showDeleteAction && (
          <IconButton 
            size="small" 
            sx={{ color: 'error.main' }}
            onClick={() => {
              setSelectedItem(row);
              onDelete(row);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
        {showViewAction && (
          <IconButton 
            size="small" 
            sx={{ color: 'info.main' }}
            onClick={() => {
              if (onView) {
                onView(row);
              }
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        )}
      </>
    ),
  }));

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
    } else {
      setOpenAddDialog(true);
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedItem(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: 'calc(100vh - 100px)', // Ajustar para el header
          width: '100%'
        }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      );
    }

    return (
      <>
        <TitleHeader
          title={title}
          description={description}
          button={
            <Button
              variant="contained"
              sx={{backgroundColor:"#F5C518", fontWeight: 600, color: "#0B2240"}}
              onClick={handleAdd}
              startIcon={addButtonIcon}
            >
              {addButtonText}
            </Button>
          }
        />
        <CommonTable
          title={tableTitle}
          columns={columns}
          rows={rowsWithActions}
          defaultRowsPerPage={defaultRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
        
        {/* Add Dialog */}
        {addDialog && React.cloneElement(addDialog, {
          open: openAddDialog,
          onClose: handleCloseAddDialog
        })}
        
        {/* Edit Dialog */}
        {editDialog && React.cloneElement(editDialog, {
          open: openEditDialog,
          onClose: handleCloseEditDialog,
          item: selectedItem
        })}
      </>
    );
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#EBEBEB', height: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: 3,
          pr: 3,
          ml: `280px`,
          height: '100%',
          backgroundColor: backgroundColor
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default DataManagementPage; 