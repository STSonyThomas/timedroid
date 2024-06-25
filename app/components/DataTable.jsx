"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast,Toaster } from "react-hot-toast";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  // const rowsData = rowData;
  // console.log(rowsData);
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const color = {
    pending:"yellow",
    accepted:"green",
    rejected:"red",
  }

  React.useEffect(() => {
    setLoading(true);
    const callData = async () => {
      try {
        const response = await axios.get("/api/users/userDashboard");
        setData(response.data.data);
        // console.log(response.data.data);
        // console.log(data);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    callData();
  }, [setData, setLoading]);

  if (loading || !data) {
    return <div className="flex justify-center align center min-h-screen min-w-full">
        <h1 className="text-black"> Loading Data please wait...</h1>
    </div>;
  } else {
    // console.log(data);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date of Week</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Year&nbsp;(Y)</TableCell>
              <TableCell align="right">Month&nbsp;(M)</TableCell>
              <TableCell align="right">hours&nbsp;(h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.userid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right" className={color[row.status]} color={color[row.status]}>{row.status}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{row.month}</TableCell>
                <TableCell align="right">{row.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
