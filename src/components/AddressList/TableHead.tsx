import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type Props = {
  children: JSX.Element | string;
}

export default function TableHeader({ children }: Props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={3}>
          <Typography variant="h5" gutterBottom component="div">
            {children}
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
