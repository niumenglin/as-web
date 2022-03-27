import React from "react";
import {Layout,Menu} from 'antd';
/* withRouter不存在 */
import {withRouter} from 'react-router-dom';
import './DrawerMenu.less';
import {HomeOutlined,ProjectOutlined,
    AppstoreAddOutlined,
    TeamOutlined,
    PicCenterOutlined,
    ShopOutlined,
    FileAddFilled
    } from "@ant-design/icons";
//导入样式

//as表示起个别名
import NavigationUtil, {RouteConfig as MENUS,ROUTE_CHANGE} from './Navigator';
import EventBus from 'react-native-event-bus';

const {Sider} = Layout;
const {SubMenu} = Menu;


class Index extends  React.Component{
    state = {
        selectedKeys:MENUS.home.key,//当前选中的菜单项
    }

    //页面加载时
    componentDidMount() {
        EventBus.getInstance().addListener(ROUTE_CHANGE,this.listener=route=>{
           const {goto:{key,pathname,title}} = route;
           this.setState(
               {
                   selectedKeys:[key]
               }
           );
            const {onMenuSelect} = this.props;
            onMenuSelect&&onMenuSelect(pathname,title);
        });
    }
    //页面销毁时
    componentWillMount() {
        EventBus.getInstance().removeListener(this.listener);
    }

    //方法
    onCollapse = collapsed=>{
        this.setState({collapsed});
    }
    onSelect=selectedKeys=>{
        const menu = MENUS[selectedKeys.key];
        let pathname = (menu || {}).pathname;
        const {history,onMenuSelect} = this.props;
        if (pathname){
            NavigationUtil.goto(menu,history)();
            onMenuSelect&&onMenuSelect(pathname,menu.title);
        }
    }


    menu(){
        const {selectedKeys} = this.state;
        //defaultSelectedKeys:初始化选中的菜单项
        //Menu.Item 一级菜单
        return <Menu theme='dark'
                     defaultSelectedKeys={selectedKeys}
                     selectedKeys={selectedKeys}
                     mode = 'inline'
                     onSelect={this.onSelect}
        >
            <Menu.Item key={MENUS.home.key} icon={<HomeOutlined/>}>
                {MENUS.home.title}
            </Menu.Item>

            <SubMenu key='categoryList'
                     title='类别管理'
                     icon={<ProjectOutlined/>}>
                <Menu.Item key={MENUS.category.key} icon={<AppstoreAddOutlined/>}>
                    {MENUS.category.title}
                </Menu.Item>
                <Menu.Item key={MENUS.categoryAdd.key} icon={<PicCenterOutlined/>}>
                    {MENUS.categoryAdd.title}
                </Menu.Item>
            </SubMenu>

            <Menu.Item key={MENUS.user.key} icon={<TeamOutlined/>}>
                {MENUS.user.title}
            </Menu.Item>

            <SubMenu key='configCenter'
                     title='配置中心'
                     icon={<ProjectOutlined/>}>
                <Menu.Item key={MENUS.config.key} icon={<ShopOutlined/>}>
                    {MENUS.config.title}
                </Menu.Item>
                <Menu.Item key={MENUS.configAdd.key} icon={<FileAddFilled/>}>
                    {MENUS.configAdd.title}
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

//withRouter是react-router的一个高阶组件，获取history
//render时，会把match、location和history传入props
//导出组件  export default 类名;
export default withRouter(Index);