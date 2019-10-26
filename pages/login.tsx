import React, { Component } from "react";
import Layout from "../components/layout/MyLayout";
import Router from "next/router";
import { Button } from "antd";

interface IProps {
  router: object;
  homeStore: object;
}

interface IState {
  showEditor: boolean;
}

class Login extends Component<IProps, IState> {
  public state = {
    showEditor: true
  };

  public login() {
    sessionStorage.setItem("logged", "1");

    Router.push("/");
  }

  render() {
    return (
      <Layout>
        <div className="login">
          <div className="login-logo">
            <img src="https://www.freelogodesign.org/Content/img/logo-samples/bakary.png" alt="" />
          </div>
          <div className="login-title">小八阿哥</div>
          <div className="login-tips">
            <p>小专栏是一个专业人士的创作知识社区，在这里您可以看到各个领域最专业的专栏和观点。</p>
          </div>
          <div className="login-btns">
            <Button type="primary" icon="github" size="large" onClick={this.login}>
              Github登录
            </Button>
            <Button type="danger" icon="wechat" size="large">
              微信登录
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;