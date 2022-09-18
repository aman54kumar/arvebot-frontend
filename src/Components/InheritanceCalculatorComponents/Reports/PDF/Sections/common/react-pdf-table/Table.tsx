// import { TableContainer, Table, Paper } from "@mui/material";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";
import { styles } from "../../../styles";
import { summaryValueType } from "../summary/Summary";

export const TableElement = (props: {
  summaryValue: Array<summaryValueType>;
}) => {
  const summaryVal = props.summaryValue;
  return (
    <Table data={summaryVal}>
      <TableHeader>
        <TableCell style={styles.tableHeaderRow}>Person-id</TableCell>
        <TableCell style={styles.tableHeaderRow}>Type</TableCell>
        <TableCell style={styles.tableHeaderRow}>Beløp</TableCell>
      </TableHeader>
      <TableBody>
        <DataTableCell
          style={styles.tableDataRow}
          getContent={(r) => r.survivorName}
        />
        <DataTableCell
          style={styles.tableDataRow}
          getContent={(r) => r.survivorType}
        />
        <DataTableCell
          style={styles.tableDataRow}
          getContent={(r) => r.belopAmount}
        />
      </TableBody>
    </Table>
  );
};
