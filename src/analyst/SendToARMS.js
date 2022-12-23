import { FormGroup,Label,Input, Row,Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {HTTP_HEADERS_AUTHENTICATED_FORMDATA,POST,PHOTOGRAPHS,SITE_VISIT_TATA_AIG} from '../components/Constants';
import {BASE_API} from '../config';
function SendToARMS(args){

  useEffect(()=>{ 
    setSurveyData(surveyData => ({ ...surveyData, predefineTemplateFileName:args.templatedata.siteVisitImageExcelTemplateUrl}))
    setSurveyData(surveyData => ({ ...surveyData, dataTemplateFileName:args.templatedata.siteVisitExcelTemplateUrl}))
    setSurveyData(surveyData => ({ ...surveyData, predefineSectionTemplate:PHOTOGRAPHS}))
    setSurveyData(surveyData => ({ ...surveyData, dataSectionTemplate:SITE_VISIT_TATA_AIG}))
  },[]);

  const [surveyData, setSurveyData] = useState({});
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
  };

  const upload = () => {
    
    let formData = new FormData();
    formData.append('surveyData',
        new Blob([JSON.stringify(surveyData)], { 
          type: 'application/json'
    }));
   
    return axios({
      method: POST,
      url: `${BASE_API}/survey/submit`,
      data: formData,
      headers: HTTP_HEADERS_AUTHENTICATED_FORMDATA,
      credential:true
      }).then(response => {
       if(response.status===200){
        toggle();
       }
    }).catch(err =>{
       alert(err.message);
    }); 
  };

  return (
    <div>
      <Button color="success" onClick={toggle}>Share</Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Share Template on ARMS</ModalHeader>
        <ModalBody>
          <div>
            <Row>
              <Col>
                <FormGroup>
                    <Label for="csaeId">Case Id</Label>
                    <Input id="caseId" name="caseId" placeholder="Enter Case Id" type="text"
                    onChange={(e)=>{
                      setSurveyData({...surveyData,caseId:e.target.value});
                    }}/>
                </FormGroup>
              </Col>
            </Row>
            <Row xs="2">
              <Col>
                <FormGroup>
                    <Label for="predefineSectionTemplate">Predefined Type Tag Name</Label>
                    <Input id="predefineSectionTemplate" name="predefineSectionTemplate" type="text" value={surveyData.predefineSectionTemplate} defaultValue="photographs"
                    onChange={(e)=>{
                      setSurveyData({...surveyData,predefineSectionTemplate:e.target.value});
                    }}/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                    <Label for="dataSectionTemplate">Data Type Tag Name</Label>
                    <Input id="dataSectionTemplate" name="dataSectionTemplate" type="text" value={surveyData.dataSectionTemplate} defaultValue="SiteVisitforTATAAIG"
                    onChange={(e)=>{
                      setSurveyData({...surveyData,dataSectionTemplate:e.target.value});
                    }}/>
                </FormGroup>            
              </Col>
            </Row>
          </div>  
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={upload}>Upload To ARMS</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SendToARMS;