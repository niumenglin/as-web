import React from 'react';
import './Index.less';
import {Table} from 'antd';
import api from '../../service';
const PAGE_SIZE=1;
export default class Index extends React.Component{
    state={
      list:[],
      total:0,
      loading:false
    };
    columns = [
        {
            title:'id',
            dataIndex:'id',
            key:'id',
            width:'10%',
            fixed:'left'
        },
        {
            title:'namespace',
            dataIndex:'namespace',
            key:'namespace',
            width:'20%'
        },
        {
            title:'version',
            dataIndex:'version',
            key:'version',
            width:'20%'
        },
        {
            title:'发布时间',
            dataIndex:'createTime',
            key:'createTime',
            width:'25%'
        },
        {
            title:<div className='config-operation'>操作</div>,
            dataIndex: 'operation',
            width: '30%',
            render:(text,record)=>{
                return <div className='config-operation' onClick={()=>this.handleClick(record)}>
                    <a>编辑</a>
                </div>
            }
        }
    ];

    //页面完成装载时，初始化数据
    componentDidMount() {
        this.setState({
            loading:true
        });
        this.loadData(1);
    }

    handleClick(item){

    }

    loadData(pageIndex){
        // if (pageIndex <= this.pageIndex)return;
        this.pageIndex = pageIndex;
        api.getConfig({pageIndex,pageSize:PAGE_SIZE})
            .then(response=>response.json())
            .then(result=>{
               const {data:{list,total}={}} = result;
               this.setState({
                  // list: this.state.list.concat(list),//fix 分页bug
                   list: list,
                   total,
                   loading:false
               })
            })
            .catch(e=>{
                console.log(e);
                this.setState({
                    loading:false
                })
            });
    }

    render() {
        const {list,total,loading} = this.state;
        return <Table
            columns={this.columns}
            rowKey={item=>item.id}
            dataSource={list}
            scroll={{x:1100,y:600}}
            loading={loading}
            pagination={
                {
                    total,
                    pageSize:PAGE_SIZE,
                    onChange:(page,pageSize)=>{
                        console.log(page,pageSize);
                        this.loadData(page);
                    }
                }
            }
        />
    }
}