import Add from '@mui/icons-material/Add';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useId, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '../../lib/hooks/userAccounts';

export default function UserMenu() {
  const id = useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { currentUser, logoutUser } = useAccount();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser.mutate();
    handleClose();
  };

  return (
    <>
      <Button
        id={buttonId}
        onClick={handleClick}
        color='inherit'
        size='large'
        sx={{ fontSize: '1.1rem' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={currentUser?.imageUrl} />
          {currentUser?.displayName}
        </Box>
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        <MenuItem component={Link} to='/createActivity' onClick={handleClose}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Create activity</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/profile' onClick={handleClose}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
