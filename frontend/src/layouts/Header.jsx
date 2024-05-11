import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  AccountCircleRounded as AccountCircleIcon,
  StorefrontRounded as StorefrontIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from "@mui/icons-material";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.color || props.theme.palette.text.primary};
`;

const SearchWrapper = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "250px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.light,
  "& .MuiInputBase-input": {
    paddingLeft: "20px",
    width: "100%",
    color: theme.palette.text.primary,
  },
}));
const drawerWidth = 240;

const accountItems = ["Orders", "Wishlist", "Notifications", "Settings"];

const vendorItems = [
  "Dashboard",
  "Products",
  "Add Products",
  "Orders",
  "Earning",
  "Reviews",
  "Coupon",
  "Notifications",
  "Settings",
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [vendorMenuAnchor, setVendorMenuAnchor] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleAccountMenu = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const closeAccountMenu = () => {
    setAccountMenuAnchor(null);
  };

  const toggleVendorMenu = (event) => {
    setVendorMenuAnchor(event.currentTarget);
  };

  const closeVendorMenu = () => {
    setVendorMenuAnchor(null);
  };

  const drawer = (
    <Box sx={{ textAlign: "center", padding: "10px" }}>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        <StyledLink to={"/"}>E-Commerce Site</StyledLink>
      </Typography>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={"medium"}
            textAlign={"start"}
          >
            Account
          </Typography>
          {accountItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
        <Divider />
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={"medium"}
            textAlign={"start"}
          >
            Vendor
          </Typography>
          {vendorItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: `center` }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <StyledLink to={"/"}>E-Commerce Site</StyledLink>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              gap: "10px",
            }}
          >
            <Button
              color="inherit"
              variant="text"
              startIcon={<AccountCircleIcon color="secondary" />}
              endIcon={
                accountMenuAnchor ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
              }
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={toggleAccountMenu}
            >
              Account
            </Button>
            <Button
              color="inherit"
              variant="text"
              startIcon={<StorefrontIcon color="secondary" />}
              endIcon={
                vendorMenuAnchor ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
              }
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={toggleVendorMenu}
            >
              Vendor
            </Button>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <SearchWrapper>
              <StyledInputBase
                placeholder="Search..."
                endAdornment={<SearchIcon color="secondary" />}
              />
            </SearchWrapper>
            {/* <Button
              color="secondary"
              variant="outlined"
              startIcon={<SettingsIcon color="secondary" />}
              aria-controls="account-menu"
              aria-haspopup="true"
            >
              Account
            </Button> */}
            <Button color="secondary" variant="contained">
              Logout
            </Button>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <ShoppingCartCheckoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Menu
        id="account-menu"
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        onClose={closeAccountMenu}
      >
        {accountItems.map((item) => (
          <MenuItem key={item} onClick={closeAccountMenu}>
            {item}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="vendor-menu"
        anchorEl={vendorMenuAnchor}
        open={Boolean(vendorMenuAnchor)}
        onClose={closeVendorMenu}
      >
        {vendorItems.map((item) => (
          <MenuItem key={item} onClick={closeVendorMenu}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Header;
