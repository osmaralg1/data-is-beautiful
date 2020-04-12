import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableSortLabel from '@material-ui/core/TableSortLabel';

import TablePagination from '@material-ui/core/TablePagination';

// core components
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);


export default function CustomTable(props) {
  const classes = useStyles();

  const getOrder = (sorting) => {
    if (sorting === null || sorting === undefined)
      return 'asc'
    
    
    if( sorting.sortDescending === true)
      return  'des'
    
    return 'asc'
  }

  const [order, setOrder] = React.useState(getOrder(props.sorting));
  const getOrderBy = (sorting) => {
    
    if (sorting === null || sorting === undefined)
      return null
    
    return sorting.properties
  }

  const [orderBy, setOrderBy] = React.useState(getOrderBy(props.sorting));


  const { tableHead, tableData, tableHeaderColor } = props;

  const [page, setPage] = React.useState(props.pageNumber);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);

  React.useEffect(() => {


    if (page !== props.pageNumber) {
      setPage(props.pageNumber)
    }

  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (props.onChangePage !== null && props.onChangePage !== undefined) {
      props.onChangePage(newPage)
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    if (props.onChangeRowsPerPage !== null && props.onChangeRowsPerPage !== undefined) {
      props.onChangeRowsPerPage(event.target.value)
    }
  };

  const sorting = column => event => {

    var columnName = "";
    column.name.map(name => columnName = columnName + "." + name);
    columnName = columnName.substring(1)
    var sortOrder = order
    if (orderBy === columnName) {
      if (sortOrder === 'des') {
        sortOrder = 'asc'
      } else {
        sortOrder = 'des'
      }
      setOrder(sortOrder)
    } else {
      setOrderBy(columnName)
    }

    if (props.onChangeSorting !== null && props.onChangeSorting !== undefined){
      props.onChangeSorting(columnName, sortOrder)
    }
  };

  const getSortDirection = (colum) => {
    if (orderBy === colum.name[0]) {
      return order
    }

    return false
  }

  return (
    <div className={classes.tableResponsive}>
      <Table stickyHeader className={classes.table}  style={{height: 100}}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                    sortDirection={getSortDirection(prop)}
                  >
                    <TableSortLabel
              active={orderBy === prop.name[0]}
              direction={order}
              onClick={sorting(prop)}
            >
                    {prop.title}</TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData === null || tableData === undefined ? null : 
            tableData.map((prop, key) => {
              
            return (
              [<TableRow key={key} className={classes.tableBodyRow} onClick={() =>
              {
                if (props.rowClick !== null && props.rowClick !== undefined)
                  props.rowClick(prop, key)
              } }>
                 {tableHead.map((column, columnKey) => {
                  
                  if (column.hide === true) {
                    return null
                  } else {
                    return (
                  
                  <TableCell className={classes.tableCell} >
                    {
                    column.format!== null && column.format !== undefined ? column.format(prop[column.name[0]]) : prop[column.name[0]]}
                  </TableCell>
                )}
              })}
              </TableRow>,
              
            ]
            );
          })}
        </TableBody>
        
      </Table>
      <TablePagination
      labelRowsPerPage="Zeilen pro Seite"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={props.totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
