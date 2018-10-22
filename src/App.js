import React, { Component } from "react";
import axios from "axios";
import "./App.css";
//10.42.0.84:8000

class App extends Component {
  state = {
    loged_in: true,
    user_name: "",
    password: "",
    email: "",
    msg: null,
    api: "10.42.0.84",
    port: "8000"
  };
  
  componentDidMount(){
    const { api, port } = this.state;
    axios
    .get(`http://${api}:${port}/get-users`)
    .then(res => {
      console.log("res", res);
    })
    .catch(function(error) {
      console.log("error", error);
    });
  }
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClickLogin = e => {
    e.preventDefault();
    const { api, port } = this.state;
    axios
      .post(`http://${api}:${port}/check_api`)
      .then(res => {
        if (res) {
          this.login();
          console.log("im here", res);
        }
      })
      .catch(error => {
        this.setState({ msg: "api is wrong!!" });
      });
  };

  login = () => {
    const { api, user_name, password, port } = this.state;
    axios
      .post(`http://${api}:${port}/login`, { user_name, password })
      .then(res => {
        console.log("logining", res);
        if (res.data) {
          this.setState({ loged_in: res.data });
        }
        if (!res.data) {
          this.setState({ msg: "user or password are wrong!!" });
        }
      })
      .catch(error => {
        this.setState({ msg: error.response.data });
        console.log("error", error.response.data);
      });
  };

  onClick = name => {
    console.log("onclick", name);
    const { api, port } = this.state;
    axios
      .post(`http://${api}:${port}/save`, { name })
      .then(res => {
        console.log("res", res);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };
  onMouseDown = e => {
    console.log("down", e);
  };
  // onMouseEnter=(e)=>{

  //   console.log(e)
  // }

  onSaveData = e => {
    e.preventDefault();
    const { user_name, password, email, api, port } = this.state;
    axios
      .post(`http://${api}:${port}/save-data`, { user_name, password, email })
      .then(res => {
        console.log("res", res);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };
  render() {
    const { loged_in, msg } = this.state;
    return (
      <div
        className="container container-form"
        // onMouseMove={this.onMouseEnter}
      >
        {!loged_in && (
          <form className="form">
            <input
              type="text"
              className="form-control"
              name="api"
              placeholder="api"
              value={this.state.api}
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              className="form-control"
              name="port"
              placeholder="port"
              value={this.state.port}
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              className="form-control"
              name="user_name"
              placeholder="User name"
              value={this.state.user_name}
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
            <button className="btn" onClick={this.onClickLogin}>
              login
            </button>
          </form>
        )}
        {loged_in ? (
          <div>
            <button
              className="btn"
              onClick={() => this.onClick(4)}
              onMouseDown={this.onMouseDown}
            >
              start
            </button>
            <button className="btn" onClick={() => this.onClick(6)}>
              stop
            </button>
            <button className="btn" onClick={() => this.onClick(10)}>
              speed
            </button>
            <button className="btn" onClick={() => this.onClick(20)}>
              save data
            </button>
          </div>
        ) : (
          <p>{msg}</p>
        )}
        <div>
          <form className="form">
            <input
              type="text"
              className="form-control"
              name="user_name"
              placeholder="User name"
              value={this.state.user_name}
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
            />
            <input
              type="text"
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
            <button className="btn" onClick={this.onSaveData}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
//https://docs.sqlalchemy.org/en/latest/orm/tutorial.html
// cp -a /home/mohseh/Desktop/boot/. /media/mohseh/boot
