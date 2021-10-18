import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { Menu as MenuIcon } from "@material-ui/icons";

import { MouseEvent, useState } from "react";

import NavMenu from "@/components/TopAppBar/NavMenu";

export default function TopAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <NavMenu handleClose={handleClose} anchorEl={anchorEl} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lista de Endereços
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}