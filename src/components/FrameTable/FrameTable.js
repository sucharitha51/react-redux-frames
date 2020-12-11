import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable({ tableData, selected, copiedFrame }) {
  const classes = useStyles();
  let rows;
  let tableCells;
  let tableHeaders;

  let keyVal = 0;

  if (tableData) {
    rows = [tableData[selected].row];

    if (copiedFrame) {
      rows = [...rows, copiedFrame.row];
    }

    tableCells = tableData[selected].row.map((cellValue, i) => {
      const renderHTML = (rawHTML) =>
        React.createElement("div", {
          dangerouslySetInnerHTML: { __html: rawHTML },
        });
      keyVal++;
      return (
        <TableCell key={keyVal}>
          {renderHTML(Object.values(cellValue)[0])}
        </TableCell>
      );
    });

    tableHeaders = tableData[selected].row.map((cellValue) => {
      keyVal++;

      const modifiedCellValue = Object.keys(cellValue)[0]
        .slice(1)
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(" ");

      const renderHTML = (rawHTML) =>
        React.createElement("div", {
          dangerouslySetInnerHTML: { __html: rawHTML },
        });

      return (
        <TableCell key={modifiedCellValue + keyVal}>
          {renderHTML(modifiedCellValue)}
        </TableCell>
      );
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: "rgb(239, 239, 239" }}>
          <TableRow>{tableData && tableHeaders}</TableRow>
        </TableHead>
        <TableBody>
          {tableData &&
            rows.map((row) => (
              <TableRow key={row + keyVal++}>{tableCells}</TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
