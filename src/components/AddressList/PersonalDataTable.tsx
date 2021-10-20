import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

type Props = {
  birthday: string;
  email:string;
};

export default function PersonalDataTable({...props }: Props) {
  const {birthday, email} = props;
  return (
    <Table size="small" aria-label="dados-pessoais">
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row" width="50%">
            Nascimento:
          </TableCell>
          <TableCell width="50%">{birthday}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row" width="50%">
            Email:
          </TableCell>
          <TableCell width="50%">{email}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
