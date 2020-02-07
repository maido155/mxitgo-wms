import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {Table, Icon, Input, Row, Col} from 'antd';


  

class tableModal extends PureComponent{

    render(){
        return(
          <Row type="flex" justify="center">
        <label>Jue 8 Nov:</label>
          <Col >
              <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
           <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>

          <Col >
        <label>Vie 9 Nov:</label>
          </Col>
          <Col >
              <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
           <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>

          <Col >
        <label>Sab 10 Nov:</label>
          </Col>
          <Col >
              <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
           <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>

          <Col >
        <label>Dom 11 Nov:</label>
          </Col>
          <Col >
              <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
           <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>  

           <Col >
        <label>Lun 12 Nov:</label>
          </Col>
          <Col >
              <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
           <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%"}}></Input>
          </Col>

          <Col >
        <label>Mar 13 Nov:</label>
          </Col>
          <Col >
              <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
           <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>

          <Col >
        <label>Mie 14 Nov:</label>
          </Col>
          <Col >
             <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
          <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
           <Col >
        <label>Mie 14 Nov:</label>
          </Col>
          <Col >
             <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
          <Col style={{marginRight:"1%", marginLeft:"1%"}}></Col>
          <Col >
           <Input style={{marginRight:"1%", marginLeft:"1%", marginBottom: "1%", marginTop:"1%"}}></Input>
          </Col>
          <div>
          <label >Total</label>
           
          <label>0</label>
         
          <label>0</label>
      </div>
      </Row>
    
      
        );
    }

}
export default tableModal;