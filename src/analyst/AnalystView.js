import { useEffect,useState } from 'react';
import { Card,CardHeader,CardBody,CardTitle,Table } from 'reactstrap';
import DownloadTemplates from './DownloadTemplates'
import SendToARMS from './SendToARMS'
import axios from 'axios';
import React from 'react';
import {DESC,HTTP_HEADERS_CONTENT_TYPE_LIST,GET,RUBIX} from '../components/Constants';
import {BASE_API} from '../config';
function AnalystView() {
    
    const [getSiteVisitData, setSiteVisitData] = useState({})
    const [siteList, setList] = useState([])

    useEffect(()=>{ 
        document.title = RUBIX;
        getSiteData(param);
        fetchData(getSiteVisitData);
    },[]);

    useEffect(()=>{ 
        if(getSiteVisitData === null){
            getSiteData(param);
        }
        fetchData(getSiteVisitData);
    },[getSiteVisitData]);

    const param={
        pageNumber : 0,
        pageSize : 10000,
        sortfield : "dataOnSubmit",
        sortDirection : DESC
    }

    const getSiteData = (param) => { 
        return axios({
            method: GET,
            url: `${BASE_API}/analyst/fetch/${param.pageNumber}/${param.pageSize}/sort/${param.sortfield}/${param.sortDirection}`,
            headers: HTTP_HEADERS_CONTENT_TYPE_LIST,
            credential:true
        }).then(response =>{ const data = response.data;
            setSiteVisitData(data)
        }
        ).catch(err => {
            if(err.status === 401){
                getSiteData();
            }
        });
    }

    const fetchData=(data)=>{
         if(Object.keys(data).length !== 0){
             const listOfData = data.recordList
             setList(listOfData)
         }
    } 

    return (
        <div>   
        <Card>
            <CardHeader>Rubix Data Science</CardHeader>
                <CardBody>
                    <CardTitle tag="h5">Site Visit Servey List</CardTitle>
                    <Table>
                        <thead>
                        <tr>
                            <th>Entity Name</th>
                            <th>Address Visited</th>
                            <th>PAN/CIN/GST</th>
                            <th>Site Visit Date</th>
                            <th>Share</th>
                            <th>Download</th>
                        </tr>
                        </thead>
                        <tbody>
                             {siteList.map(data=>(
                                <tr key={data.id}>
                                    <td>{data.entityName}</td>
                                    <td>{data.address}</td>
                                    <td>{data.govtIdProofNo}</td>
                                    <td>{data.dateOnSiteVisit}</td>
                                    <td><SendToARMS templatedata={data}/></td>
                                    <td><DownloadTemplates templateData={data}/></td>
                                </tr>
                            ))}  
                        </tbody>
                    </Table>
                </CardBody>
        </Card>
        </div>
    );
  }
  
  export default AnalystView;