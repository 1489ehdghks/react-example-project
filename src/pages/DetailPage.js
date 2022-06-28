import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DetailPage2 from './DetailPage2';


const DetailPage = () => {
    const [rowData, setRowData] = useState([{
        podName: '',
        status: '',
        restartPolicy: '',
        labels: '',
        ownerReferences: '',
        podNp: '',

    }]);
    const containerStyle = useMemo(() => ({ height: '100%', }), []);




    // 
    const { id, id2 } = useParams();
    useEffect(() => {
        fetch(`/api/${id}/${id2}/details`)
            .then(result => result.json())
            .then((data) => {
                console.log('podName', data.podName)
                console.log('status', data.status)
                console.log('restartPolicy', data.restartPolicy)
                console.log('labelsKey :', Object.keys(data.labels))
                console.log('labelsValue :', Object.values(data.labels))
                console.log('ownerReferences')
                console.log('podNp', data.podNp)
                let detailobj = {
                    podName: data.podName,
                    podNp: data.podNp,
                    status: data.status,
                    restartPolicy: data.restartPolicy,
                    ownerReferences: data.ownerReferences,
                    labels: JSON.parse(`{"app" : "test", "test2" :"att"}`),
                };
                setRowData(detailobj)
            })
    }, []);


    return (
        <div style={{ containerStyle, height: '100%', width: '80%', float: 'right' }}>
            <div style={{ justifyContent: 'right', height: "100%", width: '80%' }}>
                <div style={{ width: "100%" }}>
                    <h2 data-text-context="true" fontWeight="bold" fontSize="24px" align='left'>· 상세</h2>
                    <table border="1" align="center" height="30%"
                        style={{ width: '100%', height: '250px', borderCollapse: 'collapse', }}>
                        <thead></thead>
                        <tbody>
                            <tr width="100%" height='30%'>
                                <td bgcolor="whitesmoke" align="center" ><b>이름</b></td>
                                <td >{rowData.podName}</td>
                                <td bgcolor="whitesmoke" align="center" width="13%"><b>프로젝트</b></td>
                                <td>{rowData.podNp}</td>
                            </tr>
                            <tr width="100%" height='30%' >
                                <td bgcolor="whitesmoke" align="center"><b>상태</b></td>
                                <td>{rowData.status}</td>
                                <td bgcolor="whitesmoke" align="center"><b>Restart Policy</b></td>
                                <td>{rowData.restartPolicy}</td>
                            </tr>
                            <tr width="100%" height='40%' style={{ whiteSpace: 'pre-line' }}>
                                <td bgcolor="whitesmoke" align="center"><b>소유자</b></td>
                                <td>
                                    {
                                        rowData.ownerReferences && rowData.ownerReferences.map((owner) => {
                                            let key = owner.kind;
                                            let value = owner.name;
                                            return `${key} / ${value}\n`;
                                        })
                                    }
                                </td>
                                <td bgcolor="whitesmoke" align="center"><b>라벨</b></td>
                                <td>
                                    {
                                        rowData.labels && Object.keys(rowData.labels).map((label, idx) => {
                                            let key = label;
                                            let value = rowData.labels[key];
                                            return `${key}=${value}\n`;
                                        })
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='ag-grid-start' style={{ height: "500%" }}>
                    <div>
                        <div className='ag-grid-cell' style={{ height: "100%" }}>
                            <div>
                                <h2 fontWeight="bold" fontSize="24px">· 볼륨</h2>
                            </div>

                            <div>
                                <DetailPage2 />
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div>
    )
}

export default DetailPage;