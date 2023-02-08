// 所有的请求方法
import axios from "axios"
import base from "./base"
// node>js
import qs from "qs"
const api={

    //规格参数的添加
    // * 参数：itemCatId,content,specsName
    insertItemParam(params){
        return axios.get(base.insertItemParam,{
            params
        })
    },

    // 规格模糊查询
    getparamsSerch(params){
        return axios.get(base.paramsSerch,{params})
    },
    // 规格参数接口
    getParams(params){
        return axios.get(base.params,{params})
    },
   // 规格参数删除接口
   deleteParams(params){
    return axios.get(base.deleteParams,{params})
},
    // 注册接口
    getregister(params){
        // console.log("+++",qs.stringify(params));
        return axios.post(base.register,qs.stringify(params))
    },
    // 登录接口
    getLogin(params){
        console.log("+++",qs.stringify(params));
        return axios.post(base.login,qs.stringify(params))
    },

    //商品列表
    getGoodsList(params){
        return axios.get(base.goodsList,{
            params
        })
    },
    // 商品搜索
    getSearch(params){
        return axios.get(base.search,{
            params
        })
    },
    // 类目选择  { id:cid}
    getselectCategory(params){
        return axios.get(base.selectCategory,{
            params
        })
    },
    //添加商品 参数： title cid  category sellPoint price num descs paramsInfo image
    addGoods(params){
        return axios.get(base.addGoods,{
            params
        })
    },
    // 删除商品  参数 id
    deleteGoods(params){
        return axios.get(base.deleteGoods,{
            params
        })
    },
/**
 *  编辑商品
 *  参数   title cid  category sellPoint price num descs paramsInfo image  id
 */
 updateGoods(params){
    return axios.get(base.updateGoods,{
        params
    })
 },
/**
 *  获取角色
 */
 getRoleList(){
    return axios.get(base.roleList)
 },

/**
 *  添加角色
 */
 addRole(params){
    return axios.get(base.addRole,{
        params
    })
 },


/**
 *  更新角色权限
 */
 updatarole(params){
    return axios.get(base.reqUpdateRole,{
        params
    })
 },

/**
 *  获取用户
 */
 getUserList(){
    return axios.get(base.searcUser)
 },


/**
 *  删除用户
 */
 deleteUserList(params){
    return axios.get(base.userDelete,{params})
 },

/**
 *  重置用户
 */
 updataUserList(params){
    return axios.get(base.reqUpdateUser,{params})
 },
/**
 *  获取订单
 */
 getOrderList(){
    return axios.get(base.searchOrder)
 },

/**
 *  删除订单
 */
 deleteOrderList(params){
    return axios.get(base.deleteOrder,{params})
 },


}
export default api;