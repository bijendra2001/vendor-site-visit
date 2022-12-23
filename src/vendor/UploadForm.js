import React, { useEffect ,useState} from 'react';
import {Form,FormGroup,Label,Input,Button,Container} from 'reactstrap';
import axios from 'axios';
import UploadFiles from '../components/MultipleFileUpload/UploadFile';
import {RUBIX , HTTP_HEADERS_FORMDATA,POST} from '../components/Constants';
import {BASE_API} from '../config';
const UploadForm = ()=> {

    useEffect(()=>{
        document.title = RUBIX;
    },[]);

    const [siteData, setSiteData] = useState({});
    const [uploadedImage,setUploadedImage] = useState([]);

    const handleForm = (e) =>{
        postFormData(siteData,uploadedImage);
       e.preventDefault();
    }

    const emptyField=()=>{
        setUploadedImage([]);
        setSiteData({});
    }

    const postFormData=(data,images)=>{
        let formData = new FormData(); 
        for(let i=0;i<images.capturedImages.length;i++){
            formData.append("capturedImages",images.capturedImages[i]);
        }
        formData.append('siteData',
        new Blob([JSON.stringify(data)], { 
          type: 'application/json'
        }));
        
        return axios({
            method: POST,
            url: `${BASE_API}/vendor/form`,
            data: formData,
            headers: HTTP_HEADERS_FORMDATA,
            credential:true
        }).then(response => {
            if(response.status===200){
                emptyField();
                alert("Submited !!")
                window.location.reload();
            }
        }
        ).catch(err => console.log(err));        
    };

    const uploadedFiles=(files)=>{
        setUploadedImage({...uploadedImage,capturedImages:files}); 
    }
    
    return (
        <div className='p-2 mt-3'>
            <Form onSubmit={handleForm}>
                 <FormGroup >
                    <Label for="entityName">Entity Name</Label>
                    <Input id="entityName" name="entityName" placeholder="Enter Entity Name" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,entityName:e.target.value});
                    }}
                />
                </FormGroup>
                <FormGroup>
                    <Label for="addressVisited">Address Visited</Label>
                    <Input id="addressVisited" name="addressVisited" placeholder="Enter Address Visited" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,address:e.target.value});
                    }}
                />
                </FormGroup>
                <FormGroup>
                    <Label for="govtIdProofNo">PAN/CIN/GST</Label>
                    <Input id="govtIdProofNo" name="govtIdProofNo" placeholder="Enter PAN/CIN/GST" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,govtIdProofNo:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="typeOfLocation">Type of Location </Label>
                    <Input id="typeOfLocation" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,locType:e.target.value});
                    }}
                    >
                    <option>Select</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Rural</option>
                    <option>Residential Cum Commercial</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="typeOfLocationOfTheAddressVisited"> Type of Location of the Address Visited </Label>
                    <Input id="typeOfLocationOfTheAddressVisited" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,locTypeVisited:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Rural</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="kindOfBuilding"> Kind of Building </Label>
                    <Input id="kindOfBuilding" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,kindOfBuilding:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Permanent</option>
                    <option>Temporary</option>
                    <option>Hutment</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="numberOfFloors">Number of Floors</Label>
                    <Input id="numberOfFloors" name="numberOfFloors" placeholder="Enter Number of Floors" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,noOfFloors:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="standardizedNumberOfFloors"> Standardized Number of Floors </Label>
                    <Input id="standardizedNumberOfFloors" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,standardizeNoOfFloors:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Single Storey</option>
                    <option>Multi Floors</option>
                    <option>Not Ascertained</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="sizeOfPremises">Size of Premises</Label>
                    <Input id="sizeOfPremises" name="sizeOfPremises" placeholder="Enter Size of Premises" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,sizeOfPremises:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="standardizedSizeOfPremises"> Standardized Size of Premises </Label>
                    <Input id="standardizedSizeOfPremises" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,standardizeSizeOfPremises:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Less Than 250 Square feet</option>
                    <option>250 To 500 Square Feet</option>
                    <option>500 To 1000 Square Feet</option>
                    <option>1000 To 5000 Square Feet</option>
                    <option>5000 Square Feet And Above</option>
                    <option>Not Ascertained</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="ownershipOfPremises"> Ownership of Premises </Label>
                    <Input id="ownershipOfPremises" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,ownershipOfPremises:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Owned</option>
                    <option>Rented/ Leased</option>
                    <option>Not Ascertained</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="numberOfEmployeesNoticed"> Number of Employees noticed </Label>
                    <Input id="numberOfEmployeesNoticed" name="select" placeholder="Enter Number of Employees noticed" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,noOfEmployeesNoticed:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="numberOfEmployeesNoticed"> Standardized Number of Employees noticed </Label>
                    <Input id="numberOfEmployeesNoticed" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,standardizedNoOfEmployeesNoticed:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Less Than 25</option>
                    <option>25 To 100</option>
                    <option>100 To 500</option>
                    <option>Above 500</option>
                    <option>Not Ascertained</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="nameBoardNoticed"> Name Board Noticed </Label>
                    <Input id="nameBoardNoticed" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,nameBoardNoticed:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Yes</option>
                    <option>No</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="otherComments"> Other Comments</Label>
                    <Input id="otherComments" name="text" type="textarea"
                    onChange={(e)=>{
                        setSiteData({...siteData,otherComments:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleDate">Date</Label>
                    <Input id="dateOnSiteVisit" name="date" placeholder="date placeholder" type="date"
                    onChange={(e)=>{
                        setSiteData({...siteData,dateOnSiteVisit:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="nameOfPeopleMetDuringVisit">Name of People met during Visit</Label>
                    <Input id="nameOfPeopleMetDuringVisit" name="nameOfPeopleMetDuringVisit" placeholder="Enter Name of People met during Visit" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,nameOfPeopleMetWhileVisit:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="commentsOfPeopleMetDuringVisit"> Comments of People met during Visit</Label>
                    <Input id="commentsOfPeopleMetDuringVisit" name="text" type="textarea"
                    onChange={(e)=>{
                        setSiteData({...siteData,commentOfPeopleMetWhileVisit:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="nameOfFieldExecutive">Name of Field Executive</Label>
                    <Input id="nameOfFieldExecutive" name="nameOfFieldExecutive" placeholder="Enter Name of Field Executive" type="text"
                    onChange={(e)=>{
                        setSiteData({...siteData,nameOfFieldExecutive:e.target.value});
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect"> Rubix Comments </Label>
                    <Input id="exampleSelect" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,rubixComments:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Positive</option>
                    <option>Negative</option></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="reasonsForNegativeReport">Reasons for Negative Report</Label>
                    <Input id="reasonsForNegativeReport" name="select" type="select"
                    onChange={(e)=>{
                        setSiteData({...siteData,resonForNegativeReport:e.target.value});
                    }}>
                    <option>Select</option>
                    <option>Address Changed</option>
                    <option>Entity Not Found</option>
                    <option>Incomplete Address</option>
                    <option>Location Not Traceable</option>
                    <option>Not Applicable</option></Input>
                </FormGroup>
                <UploadFiles onSubmit={uploadedFiles}/>
                <Container className='text-center'>
                    <Button type="submit" className='primary'>Submit</Button>
                </Container> 
            </Form>
        </div>
    )
}

export default UploadForm;