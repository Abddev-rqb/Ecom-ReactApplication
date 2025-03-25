import { Avatar, Menu, MenuItem } from "@mui/material";
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserMenu = () =>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state)=> state.auth);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative z-30">
      <div className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700" onClick={handleClick}>
        <Avatar alt="Menu"/>
      </div>
      <Menu
        sx={{width:"400px"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx:{width:160}
        }}
      >
        <Link to="/profile">
            <MenuItem className="flex gap-2" onClick={handleClose}>
                <BiUser className="text-xl"/>
                <span className="font-bold text-[16px] mt-1">
                    {user?.username}
                </span>
            </MenuItem>
        </Link>
        <Link to="/profile/orders">
            <MenuItem className="flex gap-2" onClick={handleClose}>
                <FaShoppingCart className="text-xl" /> 
                <span className="font-semibold ">
                    Order
                </span>
            </MenuItem>
        </Link>
          <MenuItem className="flex gap-2" onClick={logOutHandler}>
          <div className="font-semibold w-full flex gap-2 items-center bg-gradient-to-r from-[#7e22ce] to-[#ef4444] px-4 py-1 text-white rounded-sm">
          <IoExitOutline className="text-xl" /> 
              <span className="font-semibold ">
                  Logout
              </span>
            </div>
          </MenuItem>
      </Menu>
    </div>
  );
};
export default UserMenu;