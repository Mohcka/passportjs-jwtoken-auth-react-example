import * as React from 'react';
import axios, { AxiosResponse } from 'axios';

export type User = {
  userId: number;
  username: string;
  password: string;
};

export interface HelloProps {
  compiler: string;
  framework: string;
}

export interface HelloState {
  emailField: string;
  passwordField: string;
  username?: string;
  user_id?: number;
}

export default class Hello extends React.Component<HelloProps, HelloState> {
  state = {
    emailField: '',
    passwordField: '',
    username: '',
    user_id: null,
  };

  constructor(props: HelloProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    if (e.target.className === 'email')
      this.setState({ emailField: e.target.value });
    else this.setState({ passwordField: e.target.value });
  }

  async login() {
    console.log('Loggin in...');

    if (
      this.state.emailField.length === 0 ||
      this.state.passwordField.length === 0
    ) {
      console.log('Enter stuff cmon');
    } else {
      axios
        .post('/auth/login', {
          username: this.state.emailField,
          password: this.state.passwordField,
        })
        .then((res: AxiosResponse<any>) => {
          console.log(res);
        });

      console.log('hello');
    }
  }

  getProfileData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const jwtToken = this.getCookie('jwt-token');
    console.log(jwtToken);
    axios
      .get('/profile', { headers: { Authorization: `Bearer ${jwtToken}` } })
      .then((res: AxiosResponse<User>) => {
        console.log(res);

        this.setState({
          username: res.data.username,
          user_id: res.data.userId,
        });
      });
  };

  getCookie = (name: string | number) => {
    let cookie = {};
    document.cookie.split(';').forEach(el => {
      let [k, v] = el.split('=');
      cookie[k.trim()] = v;
    });

    return cookie[name];
  };

  render() {
    return (
      <div id="my-app">
        <h1>
          Hello from {this.props.compiler} and {this.props.framework}
        </h1>
        <div className="login-form">
          <input
            className="email"
            type="text"
            value={this.state.emailField}
            onChange={this.handleChange}
          />
          <input
            className="pass"
            type="password"
            value={this.state.passwordField}
            onChange={this.handleChange}
          />
          <button onClick={this.login}>Login</button>
        </div>
        <button onClick={this.getProfileData}>Get Profile</button>
        <div className="user-info">
          <div className="id">{this.state.user_id}</div>
          <div className="id">{this.state.username}</div>
        </div>
      </div>
    );
  }
}
