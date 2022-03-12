import React from "react";
import {MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons';
import {Layout} from 'antd';
import './Header.less';//导入样式

const {Header} = Layout;

export default class Index extends React.Component{
    state={
        collapsed:false //默认false
    };
    //定义方法
    toggle=()=>{
        //从props中取出 toggle
        const  {toggle} = this.props;
        const {collapsed} = this.state;
        toggle && toggle(!collapsed);
        this.setState({
           collapsed:!collapsed
        });
    };

    render() {
        const {collapsed} = this.state;
        const {title} = this.props;
        return(
            <Header className='header'>
                <div onClick={this.toggle}>
                    {collapsed ? <MenuUnfoldOutlined className='header-toggle'/>:
                        <MenuFoldOutlined className='header-toggle'/>}
                </div>
                <div className='header-title'>
                    <h1>{title}</h1>
                </div>
            </Header>
        );
    }
}