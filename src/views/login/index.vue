<template>
  <div id="app">
    <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  placeholder="请输入密码" prefix-icon="el-icon-lock" show-password v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.code"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="captcha" :src="codeURL" @click="getCode" alt="">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop='ischecked'>
          <el-checkbox v-model="loginForm.ischecked"></el-checkbox>
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="loginClick">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt="" />
    </div>
  </div>
  <!-- 使用注册组件 -->
  <register ref="registerRef"></register>
  </div>
</template>

<script>
// 按需导入(令牌)
import { setToken } from '../../utils/token'
// 导入注册组件
import register from './register'
export default {
  name:'Login',
  // 注册组件
  components:{
    register
  },
  data() {
    return {
      // 验证码url地址
      codeURL:process.env.VUE_APP_BASEURL+"/captcha?type=login",

      // 表单数据对象,绑定在form标签上
      loginForm:{
        // 输入框v-model的值
        "phone": "18511111111", // 手机号
        "password": "12345678", // 密码
        "code":"", // 验证码
        ischecked:false, // 用户协议是否勾选
      },

      // 表单验证规则,rules绑定在form标签上
      rules:{
        // 定义属性prop="phone"在form-item标签上
        phone:[
          // 自定义校验规则
          { validator:(rule, value, callback)=>{
            if(!value){
              return callback(new Error('手机号不能为空'));
            }
            // 手机号的正则表达式
            const reg = /^1[3456789][0-9]{9}$/;
            if(!reg.test(value)){
              return callback(new Error('手机号格式不正确'));
            }
            callback();
          },trigger:'blur' }
        ],
        // 定义属性prop="password"在form-item标签上
        password:[
          // 验证表单是否有内容
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 验证表单长度是否为6 到 12 个字符
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        // 定义属性prop="code"在form-item标签上
        code:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度必须是4个字符', trigger: 'blur' }
        ],
        // 定义属性prop="ischecked"在form-item标签上
        ischecked:[
           { validator: (rule, value, callback)=>{
            //  console.log(value);
             if(!value){
               return callback(new Error('必须勾选用户协议'));
             }
             callback();
           }, trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    // 点击验证码重新获取验证码的url地址
    getCode(){
      // url后面添加随机不重复数字,解决get请求的url缓存问题
      this.codeURL=process.env.VUE_APP_BASEURL+"/captcha?type=login&r"+Math.random();
      // this.codeURL=process.env.VUE_APP_BASEURL+"/captcha?type=login&t"+(new Date()-0);
      // console.log(this.codeURL);
    },
    
    // 点击登录按钮
    loginClick(){
      this.$refs.loginFormRef.validate(async (valid)=>{
      //   console.log(valid);
      //   if(!valid) return;
      //   this.$axios({
      //     method:'post',
      //     url:"/login",
      //     data:this.loginForm
      //   }).then(res=>{
      //     console.log(res.data);
      //     if(res.data.code==200){
      //       this.$message({
      //       message: '登录成功',
      //       type: 'success'
      //       });
      //     }else{
      //        this.$message.error(res.data.message);
      //        this.codeURL=process.env.VUE_APP_BASEURL+"/captcha?type=login&r"+Math.random();
      //     }
      //   })

        // 校验表单是否为空
        if(!valid) return;
        // 校验表单不为空,发送axios
        const res = await this.$axios.post('/login',this.loginForm)
        console.log(res);
        // 根据axios的code判断是否登录成功
        if(res.data.code==200){
            this.$message({
            message: '登录成功',
            type: 'success'
            });
            // 保存Token令牌
            setToken(res.data.data.token);
            // 跳转到layout页面
            this.$router.push('/layout')

          }else{
             this.$message.error(res.data.message);
            //  code不为200,重新获取验证码
             this.codeURL=process.env.VUE_APP_BASEURL+"/captcha?type=login&r"+Math.random();
          }

      })
      
    },

    // 点击注册按钮
    registerClick(){
      this.$refs.registerRef.dialogVisible=true
    }
  },

  created() {
    // 获取开发阶段基准路径固定写法
    // console.log("开发阶段基准路径：",process.env.VUE_APP_BASEURL);
  },
}
</script>

<style lang="less">
  .login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>