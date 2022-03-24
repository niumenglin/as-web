import React from 'react';
import './Index.less';
// import {get} from '../service/index';
// import {api} from '../service/api';
import api from '../service'
import {Button} from 'antd';

export default class Index extends React.Component{
    state={
        result:{}
    };
    fire = () => {
      api.userList({pageIndex:1,pageSize:10})
          .then(res=>res.json())
          .then(result => {
              // console.log(result);
              // debugger;
              this.setState({
                  result
              });
          }).catch(e=>{
              console.log(e);
              // debugger;
      })
    };

    render() {
        const {result}=this.state;
        return <div className='home'>
            Home
            <Button onClick={this.fire}>Test API</Button>
            <div>
                Result:{JSON.stringify(result)}
            </div>
        </div>
    }
}