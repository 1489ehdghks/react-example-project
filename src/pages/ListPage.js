import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
// import { ModuleRegistry } from 'ag-grid-community/core';
// import { ClientSideRowModelModule } from 'ag-grid-community/client-side-row-model';
import buttoncss2 from '../css/buttoncss.jpg'


const Listpage = () => {
    const containerStyle = useMemo(() => ({ height: '100%' }), []);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs] = useState([
        { field: 'status', headerName: '상태', flex: 1, filter: true, headerCheckboxSelection: true, checkboxSelection: true, suppressMovable: true },
        { field: 'podName', headerName: '이름', flex: 4, filter: true, suppressMovable: true },
        { field: 'projectName', headerName: '프로젝트', flex: 2, filter: true, suppressMovable: true },
        { field: 'create', headerName: '생성일자', flex: 2, filter: true, suppressMovable: true },
    ]);

    // Example of consuming Grid Event  
    const cellClickedListener = useCallback(event => {

        let tabName = event.colDef.field;

        if (tabName === "status") {
            return false;
        }

        window.location.href = "/view/" + event.data.projectName + "/" + event.data.podName;
    }, []);

    // Example load data from sever
    useEffect(() => {
        fetch('/api')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    //searchbox option
    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            document.getElementById('filter-text-box').value
        );
    }, []);


    //시작
    const buttonAlert = (e) => {
        var selectedRows = gridRef.current.api.getSelectedRows();
        var selectedRowsString = '';
        var maxToShow = 5;

        selectedRows.forEach(function (selectedRow, index) {
            if (index >= maxToShow) {
                return
            }
            if (index > 0) {
                selectedRowsString += '\n';
            }

            selectedRowsString += selectedRow.podName;
        });
        if (selectedRows.length > maxToShow) {
            var othersCount = selectedRows.length - maxToShow;
            selectedRowsString +=
                ' \nand ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
        }
        alert(selectedRowsString);

    }
    const onSelectionChanged = useCallback((event) => {

        var selectedRows = gridRef.current.api.getSelectedNodes();
        console.log(selectedRows);
        var maxToShow = 5;
        if (selectedRows.length > maxToShow) {
            alert("최대 5개까지만 선택가능 합니다.")
            //gridRef.current.api('onCellKeyPress', 'space');
        }
    }, []);

    //끝

    return (
        <div style={{ containerStyle, width: "100%", justifyContent: 'center', display: 'flex', alignItems: 'center', paddingTop: '30px' }}>
            <div className='list-wrapper' style={{ width: "60%" }} >
                <div className='list-header' style={{ float: 'right', paddingTop: '20px' }} >


                    <button
                        type='button'
                        style={{ width: '40px', height: '41px' }}
                        onClick={onFilterTextBoxChanged}
                    // eslint-disable-next-line jsx-a11y/alt-text
                    ><img width="130%" height="100%" src={buttoncss2} /></button>

                    <input
                        style={{ float: 'left', width: '150px', height: '35px', textAlign: "center" }}
                        type="text"
                        id="filter-text-box"


                    />

                </div>
                <div className="ag-theme-alpine" style={{ width: "100%", height: 519, float: 'left' }}>
                    <button onClick={buttonAlert} style={{ height: '36px' }}>알림</button>
                    <AgGridReact
                        ref={gridRef} // Ref for accessing Grid's API
                        rowData={rowData} // Row Data for Rows
                        columnDefs={columnDefs} // Column Defs for Columns
                        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                        rowSelection='multiple' // Options - allows click selection of rows                   
                        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                        pagination={true}
                        paginationPageSize={10}
                        cacheQuickFilter={true}
                        onSelectionChanged={onSelectionChanged}
                        onCellKeyPress="onCellKeyPress"

                    />

                </div>
            </div>
        </div>
    );
};

export default Listpage;

//TEXT-ALIGN: -webkit-center