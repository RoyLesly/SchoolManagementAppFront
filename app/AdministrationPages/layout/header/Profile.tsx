import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { removeAuthUser, selectAuthUser } from "@/Redux/Reducers/sliceUser";
import { useDispatch, useSelector } from "react-redux";
import MyProvider from "@/app/Redux/MyProvider";
import { AvatarLink } from "@/Utils/Config";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import NotLoggedInModal from "./NotLoggedInModal";

const Profile = () => {
  const dispatch = useDispatch()
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [ showModal, setShowModal] = useState(false)
  const storeUser= useSelector(selectAuthUser);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  return (
    <MyProvider>
      <Box>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.main",
            }),
          }}
          onClick={handleClick2}
        >
          <Avatar
            src={AvatarLink}
            alt="image"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
            },
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <IconMail width={20} />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <IconListCheck width={20} />
            </ListItemIcon>
            <ListItemText>My Tasks</ListItemText>
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            <Button
              onClick={() => { setShowModal(true) }}
              variant="outlined"
              color="primary"
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Menu>
      </Box>

      <LogoutConfirmationModal 
        showModal={showModal}
        setShowModal={setShowModal}
        dispatch={dispatch}
        remove={removeAuthUser}
      />
      <NotLoggedInModal 
        showModal={storeUser.id > 0 ? false : true}
        setShowModal={setShowModal}
      />
    </MyProvider>

  );
};

export default Profile;
