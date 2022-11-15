import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface ResultTableProps {
  fishResult: {
    detections: {
        certainty: number,
        detection: string,
        position: {
            bottomright: {
                x: number,
                y: number
            },
            topleft: {
                x: number,
                y: number
            }
        }
    }[],
    fishes: any
  };
}

const ResultTable: React.FC<ResultTableProps> = (Props) => {
  const { fishResult } = Props;
  if(fishResult.detections.length === 0) return <></>;
  else return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nom scientifique</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Famille</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fishResult.detections.map((result) => (
            <TableRow
              key={fishResult?.fishes[result?.detection]?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{fishResult?.fishes[result?.detection]?.name}</TableCell>
              <TableCell align="right">{fishResult?.fishes[result?.detection]?.family}</TableCell>
              <TableCell align="right">{fishResult?.fishes[result?.detection]?.description.fr}</TableCell>
              <TableCell align="right">{fishResult?.fishes[result?.detection]?.s_type}</TableCell>
              <TableCell align="right">{fishResult?.fishes[result?.detection]?.s_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;