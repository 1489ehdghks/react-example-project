import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useParams } from 'react-router-dom';

const DetailPage2 = () => {
   const [rowData, setRowData] = useState([
   ]);
   
   const [columnDefs] = useState([
        { field: 'name', flex : 1, headerName: '이름'},
        { field: 'mountPath', flex : 1, headerName: '마운트경로' },
        { field: 'subPath', flex : 1, headerName : '서브경로' },
        { field: 'type', flex : 1, headerName : '유형' },
        { field: 'readOnly', flex : 1, headerName : '허가'}
   ])

   const {id, id2} = useParams();
   useEffect(()=>{
    fetch(`/api/${id}/${id2}/details`)
        .then(result =>result.json())
        .then((data)=>{
            let detailobj ={
                container : data.container

            };
            setRowData(detailobj)
        })

   })

   return (
       <div className="ag-theme-alpine"  height="100%" style={{ width:"100%",height:"320px" }} >
           <AgGridReact 
            height="100%" 
            style={{ width:"100%",height:"100%" }}
            rowData={rowData.container}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}>
           </AgGridReact>
       </div>
   );
};

export default DetailPage2