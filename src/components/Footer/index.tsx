import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

export default function FixedBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    switch (router.pathname) {
      case "/":
        setValue(0);
        break;
      case "/addresses/new":
        setValue(1);
        break;
      case "/addresses":
        setValue(2);
        break;
    }
  },[router.pathname, setValue]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={2}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event) => {
            switch (router.pathname) {
              case "/":
                setValue(0);
                break;
              case "/addresses/new":
                setValue(1);
                break;
              case "/addresses":
                setValue(2);
                break;
            }
          }}
        >
          <BottomNavigationAction
            onClick={() => router.push("/")}
            label="Início"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            onClick={() => router.push("/addresses/new")}
            label="Adicionar Endereço"
            icon={<ControlPointIcon />}
          />
          <BottomNavigationAction
            onClick={() => router.push("/addresses")}
            label="Lista de Endereços"
            icon={<MenuBookIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
