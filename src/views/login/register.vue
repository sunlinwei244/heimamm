<template>
  <div class="register">
    <el-dialog :visible.sync="dialogVisible" center width="600px">
      <div slot="title" class="title">注册</div>
      <!-- form表单 -->
      <el-form label-width="100px" :model="registerForm" :rules="rules">
        <el-form-item label="昵称" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="registerForm.code"></el-input>
            </el-col>
            <el-col :span="6" style="margin-left:15px">
              <img
                class="captcha"
                src="http://127.0.0.1/heimamm/public/captcha?type=login&r0.6061889838110899"
                alt
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="17">
              <el-input v-model.number="registerForm.rcode"></el-input>
            </el-col>
            <el-col :span="6" style="margin-left:15px">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button @click="dialogVisible=false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      dialogVisible: false,
      // 模型对象
      registerForm: {
        username: "",
        phone: "",
        email: "",
        avatar: "", // 头像地址
        password: "",
        code:"", //图形码
        rcode: "" // 验证码
      },
      // 表单验证对象
      rules: {
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }

              // 手机号正则
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }

              callback();
            },
            trigger: "blur"
          }
        ],
        email:[
            {required:true,validator:(rule,value,callback)=>{
                if(!value){
                    return callback(new Error("邮箱不能为空"))
                }
                // 邮箱的正则
                const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(!reg.test(value)){
                    return callback(new Error('邮箱不合法'))
                }
                
                callback();
            },trigger:"blur"}
        ],
        password:[
            {required:true,message:'密码不能为空',trigger:'blur'},
            {min:6,max:12,message:'密码长度为6 到 12 位',trigger:'blur'}
        ],
        // 图形码校验规则
        code:[
            {required:true,message:'图形码不能为空',trigger:'blur'},
            {min:4,max:4,message:'图形码长度必须是4位',trigger:'blur'}
        ],
        // 验证码校验规则
        rcode:[
            {required:true,validator:(rule,value,callback)=>{
                if(!value){
                    return callback(new Error('验证码不能为空'))
                }
                if(!Number.isInteger(value)){
                    return callback(new Error('验证码必须是数字'))
                }
                callback();
            },trigger:'blur'}
        ]
      }
    };
  }
};
</script>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;

    .title {
      height: 53px;
      background: #03c0f9;
      color: #fff;
      text-align: center;
      line-height: 53px;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }

  .captcha {
    width: 100%;
    height: 40px;
  }
}
</style>