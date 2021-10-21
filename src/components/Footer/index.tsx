import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

export default function FixedBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    toggleSelected(router.pathname);
  }, [router.pathname]);

  function toggleSelected(path: string) {
    if (path === "/") {
      setValue(0);
      setIsEditMode(false);
    } else if (path === "/addresses/new") {
      setValue(1);
      setIsEditMode(false);
    } else if (path === "/addresses") {
      setValue(2);
      setIsEditMode(false);
    } else {
      setValue(1);
      setIsEditMode(true);
    }
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={2}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={() => {
            toggleSelected(router.pathname);
          }}
        >
          <BottomNavigationAction
            onClick={() => router.push("/")}
            label="Início"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            onClick={() => router.push("/addresses/new")}
            label={isEditMode ? "Editar Endereço" : "Adicionar Endereço"}
            icon={isEditMode ? <BuildIcon /> : <ControlPointIcon />}
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
