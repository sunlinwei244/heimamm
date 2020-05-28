
const KEY = 'heimamm_token'

// 创建Token令牌
const setToken=token=>{
    // KEY是键,token是值
    localStorage.setItem(KEY,token)
}

// 获取Toke令牌
const getToken=()=>{
    return localStorage.getItem(KEY)
}

// 移除Toke令牌
const removeToken=()=>{
    localStorage.removeItem(KEY)
}

// 按需导出
export {setToken,getToken,removeToken}