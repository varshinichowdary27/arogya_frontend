import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export const SelfAssessment = ({ data }) => {
  const [row, setRow] = React.useState([]);
  React.useEffect(() => {
    if (data !== undefined) {

      console.log(data["patientList"][0] ? data["patientList"][0] : []);
      setRow(data["patientList"][0] ? data["patientList"][0] : []);
    }
  }, [data])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Problem</TableCell>
            <TableCell align="center">Frequency</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>


          {row?.questions_list?.map((questions) => (
            <TableRow key={questions.date}>
              <TableCell component="th" scope="row">
                {questions.question}
              </TableCell>
              <TableCell align={"center"}>{questions.problem_frequency}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


  );
}