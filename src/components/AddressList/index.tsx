import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import SignUpGetData from "@/components/interfaces/SignUpGetData";
import Row from "@/components/AddressList/Row";
import createData from "@/components/AddressList/helpers/createRowData";
import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { toast } from "react-toastify";
import TranslatedRows from "@/components/interfaces/TranslatedRows";
import Loader from "@/components/Loader";
import TableHeader from "./TableHead";

export default function CollapsibleTable() {
  const [rows, setRows]: [
    TranslatedRows[] | null,
    (rows: TranslatedRows[] | null) => void
  ] = useState<TranslatedRows[] | null>(null);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);

  const { signUp } = useApi();

  const createRows = useCallback(
    (axiosData: SignUpGetData[]) => {
      const TranslatedRows: TranslatedRows[] = axiosData.map((data) =>
        createData(data as SignUpGetData)
      );
      setRows(TranslatedRows);
      setLoading(false);
    },
    [setRows]
  );

  useEffect(() => {
    setLoading(true);
    signUp
      .getAll()
      .then((response) => {
        const data = response.data as SignUpGetData[];
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
            <TableHeader>Endereços Cadastrados</TableHeader>
            <TableBody>
              {rows.map((row) => (
                <Row
                  key={row["E-mail"]}
                  row={row}
                  rows={rows}
                  setRows={setRows}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : rows && !loading ? (
        <>
          <TableHeader>Nenhum Endereço Cadastrado</TableHeader>
        </>
      ) : (
        <TableHeader>
          <Loader />
        </TableHeader>
      )}
    </>
  );
}
