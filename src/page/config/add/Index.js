import React from 'react';
import {Input,Button,Alert} from 'antd';
import api from '../../../service';
import './Index.less';

const {TextArea} = Input;
export default class Index extends React.Component{
    //定义state，在里面初始化字段数据
    state={
      configText:null,
      submit:false,
      visibleAlert:false,
      errorMsg:null
    };
    constructor(props) {
        super(props);
        const {location:{state:{item}={}}={}} = this.props;
        const {namespace,originalUrl,jsonUrl,version}= item || {};
        this.namespace = namespace;
        this.version = version;
    }
    onSubmit=()=>{
        if (!this.namespace){
            this.setState({
                visibleAlert: true,
                errorMsg: 'namespace不能为空'
            });
            return;
        }
        const {configText} = this.state;
        api.updateConfig({config:configText,namespace:this.namespace})()
            .then(response=>response.json())
            .then(result=>{
                const {code,data:{version}} = result;
                if (code===0){//发布成功
                    this.setState({
                        visibleAlert: true,
                        errorMsg: null
                    })
                    this.version = version;
                    this.configText = configText;
                }
            })
            .catch(e=>{
                this.setState({
                    visibleAlert: true,
                    errorMsg: e.toString
                })
            })
    };
    render() {
        //取出stat中字段数据
        const {configText,visibleAlert,errorMsg} = this.state;
        return <div className='config-add'>
            <div className='config-add-left'>
                <div className='config-add-top'>
                    <div>namespace:</div>
                    <TextArea
                        onChange={({target:{value}}) =>{
                            this.namespace = value;
                        }}
                        defaultValue={this.namespace}
                        placeholder='请输入...'
                        autoSize={{maxRows:1}}
                        disabled={this.namespace!=null}
                    />
                </div>
                <TextArea
                    className='config-add-input'
                    value={configText}
                    onChange={({target:{value}}) =>{
                        this.setState({
                            configText: value
                        })
                    }}
                    placeholder='请输入...'
                    autoSize={{minRows:6,maxRows:16}}
                />
                <div className='config-add-btn'>
                    <Button
                        type='primary'
                        onClick={this.onSubmit}
                    >
                        提交发布
                    </Button>
                </div>
                {visibleAlert?(<Alert message={errorMsg ? errorMsg : '发布成功'} type={errorMsg ?'error' : 'success'} closable/>) : null}
            </div>
        </div>
    }
}