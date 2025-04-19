import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import styles from "./logout.css";

const LogoutModal = ({ open, handleClose, handleLogout }) => {
  return (
    <Dialog open={open} onClose={handleClose} className={styles.modalContainer}>
      <DialogTitle className={styles.dialogTitle}>Log Out</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Typography>Are you sure you want to log out?</Typography>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button className={styles.cancelButton} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
