import React from "react";
import {Layout,Menu} from 'antd';
import './DrawerMenu.less';
import {HomeOutlined,ProjectOutlined,
    AppstoreAddOutlined,
    TeamOutlined,
    PicCenterOutlined,
    ShopOutlined,
    FileAddFilled
    } from "@ant-design/icons";
//导入样式

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
    state = {
        selectedKeys:MENUS.home.key,//当前选中的菜单项
    }
    //方法
    onCollapse = collapsed=>{
        this.setState({collapsed});
    }
    onSelect=selectedKeys=>{
        this.setState({
            selectedKeys:[selectedKeys.key]
        });
    }


    menu(){
        //defaultSelectedKeys:初始化选中的菜单项
        //Menu.Item 一级菜单
        return <Menu theme='dark' defaultSelectedKeys={this.state.selectedKeys}
                     mode = 'inline'
                     onSelect={this.onSelect}
        >
            <Menu.Item key={MENUS.home.key} icon={<HomeOutlined/>}>
                {MENUS.home.title}
            </Menu.Item>

            <SubMenu key='categoryList'
                     title='类别管理'
                     icon={<ProjectOutlined/>}>
                <Menu.Item key={MENUS.categoryList.key} icon={<AppstoreAddOutlined/>}>
                    {MENUS.categoryList.title}
                </Menu.Item>
                <Menu.Item key={MENUS.addCategory.key} icon={<PicCenterOutlined/>}>
                    {MENUS.addCategory.title}
                </Menu.Item>
            </SubMenu>

            <Menu.Item key={MENUS.user.key} icon={<TeamOutlined/>}>
                {MENUS.user.title}
            </Menu.Item>

            <SubMenu key='configCenter'
                     title='配置中心'
                     icon={<ProjectOutlined/>}>
                <Menu.Item key={MENUS.configList.key} icon={<ShopOutlined/>}>
                    {MENUS.configList.title}
                </Menu.Item>
                <Menu.Item key={MENUS.addConfig.key} icon={<FileAddFilled/>}>
                    {MENUS.addConfig.title}
                </Menu.Item>
            </SubMenu>

        </Menu>
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
                {this.menu()}
            </Sider>
        );
    }
}

//导出组件  export default 类名;
export default Index;