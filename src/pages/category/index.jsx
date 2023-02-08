import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal,
  Popconfirm
} from 'antd'
import Addgoods from './addgoods/addgoods'
import LinkButton from '../../components/link-button'
import api from '../../api'

function NestedTable() {
  const [visible, setvisible] = useState(false)
  const [classDatas, setclassDatas] = useState([])
  const [searchDatas, setsearchDatas] = useState([])
  const [cur, setCur] = useState(1)//页数
  const [num, setNum] = useState(20)//默认条数
  useEffect(() => {
    http(1)
  }, [])

  // 请求
  async function http(page) {
    const res = await api.getParams({ page: page })
    setclassDatas(res.data.data)
  }

  // 搜索
  async function search(params) {
    const searchDatas = await api.getSearch({ search: params })
    setsearchDatas(searchDatas.data.result || [])
  }

  // 删除
  async function deleteAdds(category) {
    const res = await api.deleteGoods({ id: category.key })
    if (res.status === 200) {
      search({ search: category.name })
      message.success('删除成功！');
    }
  }
  function cancel() {
    message.error('操作已取消！');
  }
  // 打开＋号  将数据放进去
  function expandeds(expanded, record) {
    search(record.name)
  }
  //弹窗
  async function handleOk(adddatas) {
    await api.insertItemParam(
      adddatas
    )
    http(1)
  }
  function handleCancel(e) {
    setvisible(false);
  }
  // 打开弹窗
  function showAdd() {
    setvisible(true);
  }
  // 删除
  async function confirm(category) {
    const res = await api.deleteParams({ id: category.id })
    if (res.status === 200) {
      http(1)
      message.success('删除成功！');
    }
  }

  const expandedRowRender = (e) => {
    const columns = [
      { title: '商品名字', dataIndex: 'name', key: 'names' },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      { title: '数量', dataIndex: 'num', key: 'num' },
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的界面标签
          <>
            <Popconfirm
              title="确定删除此商品吗?"
              onConfirm={() => { deleteAdds(category) }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#" style={{ marginRight: '20px' }}>删除</a>
            </Popconfirm>
          </>
        )
      }
    ];
    const searchDatass = searchDatas.reduce((pre, ele) => {
      return [...pre,
      {
        key: ele.id,
        price: ele.price,
        name: ele.title,
        num: ele.num,
      }
      ]
    }, [])

    return <Table columns={columns} dataSource={searchDatass} pagination={false} />;
  };

  const columns = [
    { title: '商品类名', dataIndex: 'name', key: 'name' },
    { title: '类目ID', dataIndex: 'id', key: 'id' },
    {
      title: '操作',
      width: 300,
      render: (category) => ( // 返回需要显示的界面标签
        <>
          <Popconfirm
            title="确定删除此商品吗?"
            onConfirm={() => { confirm(category) }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"

          >
            <a href="#" style={{ marginRight: '20px' }}>删除</a>
          </Popconfirm>
        </>

      )
    }
  ];
  const resa = classDatas.reduce((pre, ele) => {
    return [...pre,
    {
      key: ele.id,
      name: ele.specsName,
      id: ele.id,
    }
    ]
  }, [])

  const title = (
    <span>
      <LinkButton>一级分类列表</LinkButton>
      <Icon type='arrow-right' style={{ marginRight: 5 }} />
      <span>商品分类</span>
    </span>
  )
  // Card的右侧
  const extra = (
    <Button type='primary' onClick={showAdd}>
      <Icon type='plus' />
      添加
    </Button>
  )
  return (
    <Card title={title} extra={extra}>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={expandedRowRender}
        onExpand={(expanded, record) => expandeds(expanded, record)}
        dataSource={resa}
        pagination={{
          pageSize: 8, total: num, showTotal: (total) => `共 ${total} 条数据`, current: cur,
          onChange: (page) => {
            setCur(page)
            http(page)
          }
        }}
      />
      <Modal
        title="Basic Modal"
        visible={visible}
        on-----k={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <Addgoods handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>
    </Card>
  );
}
export default NestedTable