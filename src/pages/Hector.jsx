import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Alert, Icon, Row, Layout, Divider, Button } from 'antd';
import styles from './Hector.less';
import Column from 'antd/lib/table/Column';

const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

function pageFb(e) {
  alert("Click on Aceptar to open Facebook");
  e.preventDefault();
  window.location = 'https://www.facebook.com/hectorulises.robledooropeza';
}
function pageInst(e) {
  alert("Click on Aceptar to open Instagram");
  e.preventDefault();
  window.location = 'https://www.instagram.com/hec_rob/?hl=es-la';
}
function pageYout(e) {
  alert("Click on Aceptar to open Youtube");
  e.preventDefault();
  window.location = 'https://www.youtube.com/channel/UC6OqVqBpUBLwnCpUnsBeq9g?view_as=subscriber';
}

export default () => (
  <Layout>
    <Content style={{flexDirection: top}}>
    <Card
    hoverable
    style={{ width: 240, borderColor: "#3b5998" }}
    cover={<img alt="Héctor Robledo" src="https://lh3.googleusercontent.com/_nW3K4xmGoRTJWOX2AQ9Xr9YBl_0NUBGnqXB3dyR1On5_jj5nLfiC0VmiNkXpYJ4UL-t-w=s85" onClick ={pageFb}/>}>
    <Meta style={{fontFamily:"Comic Sans MS", fontSize:22}} title="Hector Robledo" description="www.facebook.com" />
  </Card>, 
  <Card
    hoverable
    style={{ width: 240, borderColor: "#ff0080" }}
    cover={<img alt="hec_rob" src="https://lh3.googleusercontent.com/31WZJmbQCBwAxo3IFW2FHB8aukTmDCr7rfWJ5pulQcNoc0eQ3QjKD0eIqBS59u11vHceyMI=s85" onClick ={pageInst}/>}>
    <Meta style={{fontFamily:"Comic Sans MS", fontSize:20}} title="hec_rob" description="www.Instagram.com" />
  </Card>,

  <Card
    hoverable
    style={{ width: 240, borderColor: "#ff0080" }}
    cover={<img alt="youtubePhoto" src="https://lh3.googleusercontent.com/D-pLRHzOVnvG8-dT_BlaB6f-biR3cw7bH-mJzUm_ZRmO3oc2c7RfrgdEN4bAzpq2mqSSxQ=s85" onClick ={pageYout}/>}>
    <Meta style={{fontFamily:"Comic Sans MS", fontSize:20}} title="Youtube" description="www.youtube.com" />
  </Card>
</Content>,

<Card style={{borderColor: "#ff0080" }}>
<Divider >
<p>
Hi! my name is Hector, i´m from Aguascalientes, Ags, Mexico. I´m 22 years old and I guess that I´m gentle. 
</p>
<Divider dashed /> 
<p>
I love cats and dogs. I want to meet Canada and some different countries,
I like to go out with my friends,
drink beer, walk in the park, listen music and many more activities. 
</p> 
</Divider>
  </Card>
  </Layout>
)
