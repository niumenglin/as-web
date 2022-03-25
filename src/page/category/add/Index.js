import React from 'react';
import {Form,Input,Button,notification} from 'antd';
import './Index.less';
import api from '../../../service';

export default class Index extends React.Component{
    formRef = React.createRef();
    onFinish=({categoryName})=>{
        // debugger;
        const nameArray = categoryName.replace(' ','').split('|');
        const promises=[];
        nameArray.forEach(categoryName=>{
            promises.push(this.addCategory(categoryName));
        });
        Promise.allSettled(promises)
            .then(results=>{
                const successArray=[];
                const failArray=[];
                results.forEach(result=>{
                    const {status,value,reason} = result;
                    if (status==='fulfilled'){//成功
                        successArray.push(value.categoryName);
                    }else{//失败
                        failArray.push(reason);
                    }
                });
                this.showFailResult(failArray);
                this.showSuccessResult(successArray);
            })
        // api.addCategory()({categoryName})
        //     .then(res=>res.json())
        //     .then(result=>{
        //         console.log(result);
        //         debugger
        //     })
        //     .catch(e=>{
        //         console.log(e);
        //         debugger
        //     })
    };

    addCategory(categoryName){
        return new Promise((resolve,reject)=>{
            api.addCategory()({categoryName})
                .then(res=>res.json())
                .then(result=>{
                    console.log(result);
                    const {code,message}=result;
                    if (code===0){//执行成功
                        resolve({categoryName,message});
                    }else{//执行失败
                        reject({categoryName,message});
                    }
                })
                .catch(e=>{//异常
                    console.log(e);
                    reject({categoryName,message:e.toString()});
                })
        });
    }

    onReset=()=>{
      this.formRef.current.resetFields();
    };
    render() {
        return <Form
            className='category-add'
            ref={this.formRef}
            name='control-ref'
            onFinish={this.onFinish}
        >
            <Form.Item
                name='categoryName'
                label='类别名'
                extra='通过|分割来一次性添加多条记录'
                rules={[
                    {required:true}
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                className='category-add-btn-layout'
            >
                <Button
                    className='category-add-btn'
                    type={"primary"} htmlType={"submit"}>
                    提交
                </Button>
                <Button htmlType={"button"} onClick={this.onReset}>
                    重置
                </Button>
            </Form.Item>

        </Form>
    }

    showSuccessResult(successArray){
        if (!successArray||successArray.length===0){
            return;
        }
        notification['success'](
            {
                placement:'bottomRight',
                message:'添加成功',
                description:successArray.toString()
            }
        )
    }

    showFailResult(failArray){
        if (!failArray||failArray.length===0){
            return;
        }
        const shows=[];
        failArray.forEach(val=>{
            const {categoryName,message} = val;
            shows.push(<div key={categoryName}>{categoryName}:{message}</div>);
        })

        notification['error'](
            {
                duration:null,//不消失，手动关闭
                placement:'bottomRight',
                message:'添加失败',
                description:shows
            }
        )
    }

}