import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import signupGetData from "@/components/interfaces/signupGetData";
import Row from "./Row";
import createData from "./helpers/createRowData";
import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { toast } from "react-toastify";
import translatedRows from "../interfaces/translatedRows";
import Loader from "@/components/Loader";

// const getDataExample = [
//   {
//     _id: "616e466c2083af425948cc1c",
//     email: "teste@teste.com.br",
//     address: {
//       cep: "20271-204",
//       street: "Rua General Canabarro",
//       city: "Rio de Janeiro",
//       number: "851",
//       state: "RJ",
//       neighborhood: "Maracanã",
//       addressDetail: "cefet-rj",
//     },
//     name: "teste",
//     updatedAt: "2021-10-19T04:21:15.486Z",
//   },
//   {
//     _id: "616e48dc2083af42594b677f",
//     email: "teste12@teste.com.br",
//     address: {
//       cep: "23916-005",
//       street: "Avenida Antônio Bertholdo da Silva Jordão",
//       city: "Angra dos Reis",
//       number: "123",
//       state: "RJ",
//       neighborhood: "Monsuaba",
//       addressDetail: null,
//     },
//     name: "teste 12",
//     updatedAt: "2021-10-19T04:26:04.397Z",
//   },
// ];

//const rows: translatedRows[] = getDataExample.map((data) => createData(data as signupGetData));

export default function CollapsibleTable() {
  const [rows, setRows]: [
    translatedRows[] | null,
    (rows: translatedRows[] | null) => void
  ] = useState<translatedRows[] | null>(null);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);

  const { signUp } = useApi();

  const createRows = useCallback(
    (axiosData: signupGetData[]) => {
      const translatedRows: translatedRows[] = axiosData.map((data) =>
        createData(data as signupGetData)
      );
      setRows(translatedRows);
      setLoading(false);
    },
    [setRows]
  );

  useEffect(() => {
    setLoading(true);
    signUp
      .getAll()
      .then((response) => {
        const data = response.data as signupGetData[];
        createRows(data);
        setLoading(false);
      })
      .catch(() =>
        toast("Ops, estamos com muita demanda, tente novamente mais tarde")
      );
  }, [setLoading, createRows]);

  return (
    <>
      {rows && rows.length && !loading ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="h5" gutterBottom component="div">
                    Endereços Cadastrados
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row["Id"]} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Loader />
      )}
    </>
  );
}
