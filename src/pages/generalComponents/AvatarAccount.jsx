import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { Avatar } from 'antd';

export default class AvatarAccount extends PureComponent {
    render() {
        console.log("AvatarAccount")
        console.log(this.props)
        // const styleNoImage = {
        //     backgroundColor: '#64a9dd',
        // }


        let styleNoImage = {
            backgroundColor: '#64a9dd'
        }
        let styleNoImageColorText = {
            color: "#fff",
            fontSize: "5rem"
        }

        if (this.props.sourceAvatar) {
            if (this.props.sourceAvatar.indexOf("http") !== -1) {
                styleNoImage = {
                    backgroundColor: '#64a9dd00'
                }
                // styleNoImageColorText = {
                //   color: "#fff"
                // }
            }
        }

        return (
            <div>
                {/* <Avatar size={200} src={this.props.dataImagen}>
                    {"user"}
                </Avatar> */}
                {/* {this.props.nameUser ? */}
                <Avatar
                    size={200}
                    style={styleNoImage}
                    src={(this.props.sourceAvatar !== "" ? this.props.sourceAvatar : undefined)}
                >
                    <div style={styleNoImageColorText}>{this.props.sourceAvatar}</div>
                </Avatar>
                {/* :

                    <Avatar
                        size={200}
                        src={<Image src={this.props.dataImagen} />}
                    >
                    </Avatar>

                } */}

            </div>
        );
    }
}