import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import createData from "@/components/AddressList/helpers/createRowData";
import Button from "@/components/AddressList/Button";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BuildIcon from "@mui/icons-material/Build";
import useApi from "@/hooks/useApi";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

import AddressKeys from "@/components/interfaces/AddressKeys";
import TranslatedRows from "@/components/interfaces/TranslatedRows";
import PersonalDataTable from "@/components/AddressList/PersonalDataTable";

export default function Row(props: {
  row: ReturnType<typeof createData>;
  rows: TranslatedRows[];
  setRows: (rows: TranslatedRows[] | null) => void;
}) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { signUp } = useApi();

  function editItem(slug: string) {
    router.push(`/addresses/${slug}`);
  }

  function deleteItem(slug: string) {
    setIsLoading(true);
    signUp
      .deleteBySlug(slug)
      .then((response: any) => {
        const item = response.data.value || null;
        //refatorar caso seja possível fazer utilizando zustand!
        if (item && item.slug) {
          const filteredRows = props.rows.filter(
            (row) => row["slug"] !== item.slug
          );
          props.setRows(filteredRows);
        }

        setIsLoading(false);
        toast("Deletado com sucesso!");
      })
      .catch(() => {
        setIsLoading(false);
        toast("Não foi possível deletar! :(");
      });
  }
  
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width="10%">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width="90%">
          {row["Nome"]}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" component="div">
                Dados Pessoais
              </Typography>
              <PersonalDataTable
                birthday={row["Nascimento"]}
                email={row["E-mail"]}
              />
              <Typography variant="h6" component="div">
                Endereço
                <Button
                  disabled={isLoading}
                  onClick={() => editItem(row["slug"])}
                >
                  <BuildIcon />
                </Button>
                <Button
                  disabled={isLoading}
                  color="secondary"
                  onClick={() => deleteItem(row["slug"])}
                >
                  <DeleteForeverIcon />
                </Button>
              </Typography>
              <Table size="small" aria-label="endereço">
                <TableBody>
                  {Object.keys(row.address).map((addressKey) => {
                    return (
                      <TableRow key={addressKey}>
                        <TableCell component="th" scope="row" width="50%">
                          {addressKey}
                        </TableCell>
                        <TableCell width="50%">
                          {row.address[addressKey as keyof AddressKeys]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
