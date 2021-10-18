import { Menu, MenuItem } from "@mui/material";

import Link from "next/link";

type props = {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
};

export default function NavMenu(props: props) {
  const { anchorEl, handleClose } = props;

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Link href="/" passHref>
        <MenuItem onClick={handleClose}>Início</MenuItem>
      </Link>
      <Link href="/addresses/new" passHref>
        <MenuItem onClick={handleClose}>Adicionar Endereço</MenuItem>
      </Link>
      <Link href="/addresses" passHref>
        <MenuItem onClick={handleClose}>Lista</MenuItem>
      </Link>
    </Menu>
  );
}
