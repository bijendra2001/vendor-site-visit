import axios from 'axios';
import {Button} from 'reactstrap';
import React from 'react';
import fileSaver from 'file-saver';
import {BASE_API} from '../config';
import {HTTP_HEADERS_RESPONSE_TYPE_ARRAYBUFFER, HTTP_RESPONSE_TYPE_ARRAYBUFFER,GET} from "../components/Constants";

const DownloadTemplates =({templateData})=>{
    let flag = true;
    const downloadTemplate=()=>{
        download(templateData.siteVisitExcelTemplateUrl);
    }

    const download=(template)=>{
        
        const templateName = []
        templateName.push(template);
        
        return axios({
            method: GET,
            url: `${BASE_API}/analyst/download/template/${templateName}`,
            headers: HTTP_HEADERS_RESPONSE_TYPE_ARRAYBUFFER,
            responseType:HTTP_RESPONSE_TYPE_ARRAYBUFFER,
            credential:true
        }).then(response => {
            var blob = new Blob([response.data],
                 { type: 'application/octet-stream' });
            fileSaver.saveAs(blob, templateName);
            if(response.status===200 && flag===true){
                download(templateData.siteVisitImageExcelTemplateUrl);
                flag = false;  
            }
        }).catch(err => {alert(err.message);});
    }

    return(
        <div><Button color="primary" download="true" onClick={downloadTemplate}>Download</Button></div>
    )
}

export default DownloadTemplates;