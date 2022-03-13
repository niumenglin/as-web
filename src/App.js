import React from "react";
import  {Layout} from 'antd';
import './App.less';
import DrawerMenu from "./component/DrawerMenu";
import Header from "./component/Header";
import {Switch,Route} from 'react-router-dom';

import Home from './page/Index';
import CategoryList from './page/category/Index';
import CategoryAdd from './page/category/add/Index';
import User from './page/user/Index';
import ConfigList from './page/config/Index';
import ConfigAdd from './page/config/add/Index';

const  {Content,Footer} = Layout;

class App extends React.Component{
    //用于控制菜单展开和收起的状态，默认情况下收起=false
    state={
        title:'首页',//默认值
        collapsed:false,
    }
    render() {
        //取出state中定义的变量
        const {collapsed,title} = this.state;
        return (
            <Layout className='App'>
                <DrawerMenu collapsed={collapsed} onMenuSelect={(pathname,title)=>{
                    this.setState({
                        title
                    });
                }}/>
                <Layout>
                    <Header title={title} toggle={(collapsed)=>{
                        this.setState({collapsed});
                    }}/>
                    <Content className='App-content'>
                        <Switch>
                            /**一级路由跳转至二级路由 根路由需要精确匹配，否则无法跳转到子路由里面去**/
                            <Route exact path="/" component={Home}/>
                            <Route path="/category" component={CategoryList}/>
                            <Route path="/category-add" component={CategoryAdd}/>
                            <Route path="/user" component={User}/>
                            <Route path="/config" component={ConfigList}/>
                            <Route path="/config-add" component={ConfigAdd}/>
                        </Switch>
                    </Content>
                    <Footer className='App-footer'>移动端架构师管理后台 ©2022 Create by nml
                        <a href='https://class.imooc.com/sale/mobilearchitect'>移动端架构师成长体系课</a>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;
