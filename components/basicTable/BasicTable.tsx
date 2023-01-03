import {TableHead} from '@mui/material';
import {TableCell} from '@mui/material';
import {Paper} from '@mui/material';
import {TableBody} from '@mui/material';
import {TableRow} from '@mui/material';
import {Table} from '@mui/material';
import {TableContainer} from '@mui/material';

type IProps = {
  columns: {key: number | string; name: string}[];
  rows: {[key in string]: string | number}[];
};

const BasicTable: React.FC<IProps> = ({columns, rows}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({key, name}) => (
              <TableCell key={key} align="center">
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                {Object.values(row).map((text, index) => (
                  <TableCell key={index} align="center">
                    {text}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
