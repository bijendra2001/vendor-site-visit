import UploadForm from '../vendor/UploadForm';
import { Row,Col } from 'reactstrap';
import React from 'react';
function App() {
    return (
      <div>
        <Row>
        <Col md={3}></Col>
        <Col md={6} className="bg-info text-center">
          <h1>Rubix Data Science</h1>
        </Col>
        <Col md={3}></Col>
        </Row>
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="bg-light">
          <UploadForm />
          </Col>
          <Col md={3}></Col>
        </Row>
      </div>
    );
  }
  
  export default App;