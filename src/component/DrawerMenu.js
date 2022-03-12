import React from "react";
import {Layout,Menu} from 'antd';
import './DrawerMenu.less';//导入样式

const {Sider} = Layout;
const {SubMenu} = Menu;
//菜单配置
const MENUS={
    home:{
        key:'home',
        title:'首页',
    },
    user:{
        key:'user',
        title:'用户管理',
    },
    categoryList:{
        key:'categoryList',
        title:'类别列表',
    },
    addCategory:{
        key:'addCategory',
        title:'添加类别',
    },
    configList:{
        key:'configList',
        title:'配置列表',
    },
    addConfig:{
        key:'addConfig',
        title:'添加配置',
    }
};

class Index extends  React.Component{

    //方法
    onCollapse = collapsed=>{
        this.setState({collapsed});
    }

    render() {
        const {collapsed} = this.props;
        //展示时隐藏title，收起时显示title
        const headTitle = collapsed?null:<div className='drawer-header-text-container'>
            <label className='drawer-header-text'>移动端架构师</label>
            <label className='drawer-header-text'>管理后台</label>
        </div>;
        return(
            <Sider trigger={null} collapsed={collapsed} collapsible onCollapse={this.onCollapse}>
                <div className='drawer-header'>
                    <img className='drawer-logo' alt="logo" src='https://www.devio.org/img/avatar.png'/>
                    {headTitle}
                </div>
            </Sider>
        );
    }
}

//导出组件  export default 类名;
export default Index;