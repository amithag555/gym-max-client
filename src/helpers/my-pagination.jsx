import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function MyPagination(props) {
  const [page, setPage] = React.useState(props.pageNumber - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    setPage(props.pageNumber - 1);
  }, [props.pageNumber]);

  React.useEffect(() => {
    setRowsPerPage(parseInt(props.perPage, 10));
  }, [props.perPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    props.setPerPage(event.target.value);
  };

  return (
    <TablePagination
      component="div"
      count={props.count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
