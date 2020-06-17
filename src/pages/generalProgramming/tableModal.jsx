import React, { PureComponent } from 'react';
import { _ } from 'lodash'; 
import {
  Icon, Steps, Button, Alert, Spin, Tooltip,
  Cascader, Checkbox, Select, Row, Col, Card, Divider,
  Form, List, Input, AutoComplete, Modal, DatePicker, LocaleProvider, InputNumber
} from 'antd';
import { FormattedMessage} from 'umi-plugin-react/locale';

  

class tableModal extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      sumTotalPallets: 0,
      sumTotalCajas: 0,
    };

  }

    addPallets(){
      let total = 0;
      total +=(jue_8_pallets.value!="")?parseInt(jue_8_pallets.value):0; 
      total +=(vie_9_pallets.value!="")?parseInt(vie_9_pallets.value):0;
      total +=(sab_10_pallets.value!="")?parseInt(sab_10_pallets.value):0;
      total +=(dom_11_pallets.value!="")?parseInt(dom_11_pallets.value):0;
      total +=(lun_12_pallets.value!="")?parseInt(lun_12_pallets.value):0;
      total +=(mar_13_pallets.value!="")?parseInt(mar_13_pallets.value):0;
      total +=(mie_14_pallets.value!="")?parseInt(mie_14_pallets.value):0;
      this.setState({sumTotalPallets : total});
    }

    addCajas(){
      let total = 0;
      total +=(jue_8_cajas.value!="")?parseInt(jue_8_cajas.value):0; 
      total +=(vie_9_cajas.value!="")?parseInt(vie_9_cajas.value):0;
      total +=(sab_10_cajas.value!="")?parseInt(sab_10_cajas.value):0;
      total +=(dom_11_cajas.value!="")?parseInt(dom_11_cajas.value):0;
      total +=(lun_12_cajas.value!="")?parseInt(lun_12_cajas.value):0;
      total +=(mar_13_cajas.value!="")?parseInt(mar_13_cajas.value):0;
      total +=(mie_14_cajas.value!="")?parseInt(mie_14_cajas.value):0;
      this.setState({sumTotalCajas : total});
    }


    render(){
       
      const { form } = this.props;
      const { getFieldDecorator } = form; 
      //const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 23 },md: { span: 23 },lg: { span: 23 },xl: { span:23 }},
   
    };
        return(
         <span>
            <Form {...formItemLayout}> 
           <Row>
            <Col xs={8} sm={9} md={9} lg={9} xl={9}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <label style={{ marginLeft:"10%"}}><FormattedMessage id="general.modal-label.pallets"/></label></Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> <label style={{ marginLeft:"10%"}}><FormattedMessage id="general.modal-label.boxes"/></label></Col>
           </Row>
          
           <Row>
             <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Jue 8 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('jue_8_pallets', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addPallets() }} />)}
              </Form.Item>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('jue_8_cajas', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1}  onChange={(value) => { this.addCajas() }}/>)}
              </Form.Item>
            </Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Vie 9 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('vie_9_pallets', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addPallets() }}/>)}
              </Form.Item>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('vie_9_cajas', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addCajas() }}/>)}
              </Form.Item>
            </Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Sab 10 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('sab_10_pallets', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addPallets() }}/>)}
              </Form.Item>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('sab_10_cajas', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addCajas() }}/>)}
              </Form.Item>            
            </Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Dom 11 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('dom_11_pallets', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1}  onChange={(value) => { this.addPallets() }}/>)}
              </Form.Item>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('dom_11_cajas', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1}  onChange={(value) => { this.addCajas() }}/>)}
              </Form.Item>
            </Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Lun 12 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('lun_12_pallets', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addPallets() }}/>)}
              </Form.Item>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('lun_12_cajas', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addCajas() }}/>)}
              </Form.Item>
            </Col>
           </Row>
           <Row>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} label="Mar 13 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('mar_13_pallets', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1}  onChange={(value) => { this.addPallets() }}/>)}
              </Form.Item>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('mar_13_cajas', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1}  onChange={(value) => { this.addCajas() }}/>)}
              </Form.Item>
            </Col>
           </Row>
           <Row style={{height: "1%"}}>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
            <Form.Item style={{ marginLeft:"30%"}} style={{ marginLeft:"30%"}} label="Mie 14 Nov"></Form.Item></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}> 
                  {getFieldDecorator('mie_14_pallets', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addPallets() }}/>)}
              </Form.Item>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}> 
              <Form.Item {...formItemLayout}>
                  {getFieldDecorator('mie_14_cajas', {})(<InputNumber type="number" style={{ width: "100%" }} min={0} max={99} step={1} onChange={(value) => { this.addCajas() }}/>)}
              </Form.Item>
            </Col>
           </Row>
           <Row>
            <Col xs={9} sm={9} md={9} lg={9} xl={9}> 
            <Form.Item label="Total:" style={{ marginRight:"24%"}} ></Form.Item></Col>
            <Col xs={7} sm={3} md={3} lg={3} xl={3}>   <Form.Item ><label style={{ marginLeft:"50%"}}> {this.state.sumTotalPallets} </label></Form.Item></Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}></Col>
            <Col xs={7} sm={7} md={7} lg={7} xl={7}>  <Form.Item> <label  style={{ marginLeft:"30%"}}> {this.state.sumTotalCajas} </label></Form.Item></Col>
           </Row>
           </Form>
         </span>
    
      
        );
    }

}
//export default tableModal;
export default Form.create()(tableModal);