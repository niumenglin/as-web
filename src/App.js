import React from "react";
import  {Layout} from 'antd';
import './App.less';
import DrawerMenu from "./component/DrawerMenu";
import Header from "./component/Header";

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
                <DrawerMenu collapsed={collapsed}/>
                <Layout>
                    <Header title={title} toggle={(collapsed)=>{
                        this.setState({collapsed});
                    }}/>
                    <Content className='App-content'>
                        内容区域
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
