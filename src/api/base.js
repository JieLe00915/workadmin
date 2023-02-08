
const base={
    host:"http://localhost:8989/",
    goodsList:'/api/api/projectList',//商品列表
    search:'/api/api/search',//商品搜索
    selectCategory:"/api/api/backend/itemCategory/selectItemCategoryByParentId",//类目选择
    uploadUrl:'/api/api/upload',//图片上传 post请求
    addGoods:'/api/api/backend/item/insertTbItem',//添加商品
    deleteGoods:'/api/api/backend/item/deleteItemById',//删除商品
    updateGoods:"/api/api/backend/item/updateTbItem",//编辑商品
    login:'/api/api/login',//登录
    register:'/api/api/register',//注册
    params:'/api/api/backend/itemParam/selectItemParamAll',//规格参数列表
    paramsSerch:"/api/api/params/search",//规格参数模糊查询
    insertItemParam:'/api/api/backend/itemParam/insertItemParam',//规格参数配置-添加  * 参数：itemCatId,content,specsName
    deleteParams:'/api/api/params/delete',//规格参数额删除
    roleList:'/api/api/role/searchs',//角色
    addRole:'/api/api/addrole',//添加角色列表
    reqUpdateRole:'/api/api/reqUpdateRole',//添加角色列表
    searcUser:'/api/api/seacrchUser',//搜索用户
    userDelete:'/api/api/user/delete',//删除用户
    reqUpdateUser:'/api/api/updateUser',//重置用户
    searchOrder:'/api/api/seacrchOrder',//搜索订单
    deleteOrder:'/api/api/order/delete',//删除订单
}
export default base;