import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import styles from "assets/jss/material-dashboard-react/views/tablesStyle.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";


import {getData} from "variables/simulation/simulationRealData";
import {usePrevious} from "utils/misc";
const useStyles = makeStyles(styles);


export default function TableView(props) {
    const classes = useStyles();
  


    const [data, setData] = React.useState(getData(props.country));
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);
    const [lastPage, setLastPage] = React.useState(true);
    const [pageNumber, setPageNumber] = React.useState(0);
    
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [paging, setPaging] = React.useState(props.paging);
    const [filter, setFilter] = React.useState(props.filter);

    const [sorting, setSorting] = React.useState(props.sorting);
    const prevProps = usePrevious(props)
    React.useEffect(() => {
      if ((data === null || data === undefined) && props.doNotFetch !== true) {
        browseData(paging, filter, sorting)
      }

      if (filter !== props.filter) {
        setFilter(props.filter)
        if (paging !== null && paging !== undefined)
          paging.page = 0

        setPageNumber(1)
        browseData(paging, props.filter, sorting) 


      }

      if (prevProps !== null && prevProps !== undefined && prevProps.country !== props.country) {
          setData(getData(props.country))
      }
      
    }, [data, props.country])

    const browseData = (myPaging, myFilter, mySorting) => {
        
    //   browse(props.address, myFilter, myPaging, mySorting, callbackSuccess, callbackError)
    }

    const callbackSuccess = (result) => {
        
      if (result === null || result === undefined ||
        result.result.content === null || result.result.content === undefined  )
        return 

      var responseResult = result.result
      
      var dataResult = responseResult.content
      var newDatas= []
      dataResult.map(item => {
        var newData = []
        props.columns.map(column => {
            var itemValue = item
            column.name.map(columnDefinition => {
                if (itemValue !== null && itemValue !== undefined) {
                    itemValue = itemValue[columnDefinition]
                }
                return itemValue
             } )
            
            if (column.format !== null && column.format !== undefined) {
              newData.push(column.format(itemValue))
            } else {
              newData.push(itemValue)
            }
            
          return newData
        })

        newDatas.push(newData)
        return newDatas
      })

      if (props.onNewData !== null && props.onNewData !== undefined) {
        props.onNewData(newDatas)
      }

      setData(newDatas)
      setTotalPages(responseResult.totalPages)
      setTotalElements(responseResult.totalElements)
      setLastPage(responseResult.lastPage)

      setPageNumber(responseResult.number)
      setRowsPerPage(responseResult.size)

      setPaging({
        size: responseResult.size, page: responseResult.number
      })
    } 

    const callbackError = (result) => {}

    const handleChangePage = (newPage) => {
      setPageNumber(newPage)
      setPaging({size: rowsPerPage, page: newPage})
      browseData({size: rowsPerPage, page: newPage}, filter, sorting)
    };

    const handleChangeSorting = (orderBy, order) => {
   
      var newSorting = {
        properties: orderBy,
        sortDescending: order === 'des' ? true : null
      }

      setSorting(newSorting)
      browseData(paging, filter, newSorting) 
    };
  
    const handleChangeRowsPerPage = newRowsPerPage => {
      setRowsPerPage(newRowsPerPage);
      setPaging({size: newRowsPerPage, page: pageNumber})
      browseData({size: newRowsPerPage, page: pageNumber}, filter, sorting)
    };

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    
                    {
                        props.showTitle === false ?  <Table
                        tableHead={props.columns}
                        tableData={data}

                        totalPages = {totalPages}
                        totalElements = {totalElements}
                        lastPage = {lastPage}
                        pageNumber = {pageNumber}
                        rowsPerPage = {rowsPerPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        onChangeSorting = {handleChangeSorting}

                        {...props}
                        customCellClasses={[classes.center, classes.right, classes.right]}
                        customClassesForCells={[0, 4, 5]}
                        customHeadCellClasses={[
                          classes.center,
                          classes.right,
                          classes.right
                        ]}
                        customHeadClassesForCells={[0, 4, 5]}
                      /> : 
                        <Card>
                          <CardHeader color={props.color} icon>
                            <CardIcon color={props.color} >
                              {props.icon}
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>{props.title}</h4>
                          </CardHeader>
                          <CardBody>
                            <Table
                              tableHead={props.columns}
                              tableData={data}totalPages = {totalPages}
                              totalElements = {totalElements}
                              lastPage = {lastPage}
                              pageNumber = {pageNumber}
                              rowsPerPage = {rowsPerPage}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                              onChangeSorting = {handleChangeSorting}
                              {...props}
                              customCellClasses={[classes.center, classes.right, classes.right]}
                              customClassesForCells={[0, 4, 5]}
                              customHeadCellClasses={[
                                classes.center,
                                classes.right,
                                classes.right
                              ]}
                              customHeadClassesForCells={[0, 4, 5]}
                            />
                          </CardBody>
                        </Card>
                
                    }
                </GridItem>
              </GridContainer>
        </div>
    );
}
