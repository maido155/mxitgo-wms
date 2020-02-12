import React, { PureComponent } from 'react';
import { _ } from 'lodash';
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

const treeData = [
    {
      title: 'Ubicación Chiapas',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Centro: La Escondida',
          value: '0-0-0',
          key: '0-0-0',
        },
      ],
    },
    {
      title: 'Ubicacion Tabasco',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Centro: El Muelle',
          value: '0-1-0',
          key: '0-1-0',
        }
      ],
    },
  ];

export default class TreeSelectComponent extends PureComponent{
    state = {
        value: [],
      };
    
      onChange = value => {
        this.setState({ value });
      };

    render(){
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Selecciona',
            style: {
              width: '100%',
            },
          };

        return(
          <TreeSelect {...tProps} />
        );
    }
}