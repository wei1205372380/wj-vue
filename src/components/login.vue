<template>
    <body id="paper">
        <el-form class="login-container" :model="loginForm" ref="loginForm">
            <div style="margin: 10px auto 40px">
                <h3 style="text-align: center; color: #505458">系统登陆</h3>
            </div>
            <el-form-item prop="username" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                <el-input type="text" placeholder="账户" v-model="loginForm.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item prop="password" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                <el-input type="password" placeholder="密码" v-model="loginForm.password" autocomplete="off"/>
            </el-form-item>
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 50px">
                <el-checkbox style="color: #505458" v-model="checked">记住密码</el-checkbox>
            </div>
            <el-button type="primary" style="width: 100%; background-color: #505458" @click="login()" :disabled="isDisable">登录</el-button>
        </el-form>
    </body>
</template>

<script>
    import { login } from "../request/api";
    import storage from "../request/localStorage";

    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                checked: true,
                isDisable: false
            }
        },
        methods: {
            login() {
                this.isDisable = true;
                setTimeout(() => {
                    this.isDisable = false;
                }, 2000);

                this.$refs["loginForm"].validate((valid) => {
                    if (valid) {
                        login({"username": this.loginForm.username, "password": this.loginForm.password})
                            .then(response => {
                                if (response.data.success) {
                                    storage.setToken(response.data.data[0]);
                                    console.log(response.data.data);
                                    localStorage.setItem("userId", response.data.data[1]);
                                    localStorage.setItem("username", this.loginForm.username);
                                    let redirect = this.$route.query.redirect;
                                    if (redirect) {
                                        this.$router.replace({path: redirect});
                                    } else {
                                        this.$router.replace({path: "/home"});
                                    }
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: response.data.message,
                                        duration: 1000
                                    });
                                }
                            })
                    } else {
                        this.$message({
                            type: "warning",
                            message: "用户名或密码不符合要求",
                            duration: 1000
                        });
                    }
                });
            }
        }
    }
</script>

<style>
    #paper {
        background: url("../assets/img/bg/eva1.jpg") no-repeat center;
        background-size: cover;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .login-container {
        width: 400px;
        height: 320px;
        background: #fff;
        background-clip: padding-box;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        padding: 30px 50px;
    }
    body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

</style>
