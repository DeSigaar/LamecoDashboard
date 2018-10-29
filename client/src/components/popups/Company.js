import React, { Component } from "react";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      password: "",
      remember_me: false,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="loginContainer">
          <form onSubmit={this.onSubmit}>
            <div className="middleForm">
              <div className="formField">
                <p>Company</p>
                <input
                  type="text"
                  name="company"
                  placeholder="Name"
                  onChange={this.onChange}
                  value={this.state.info}
                />
                {errors.info && <div className="invalid"> {errors.info} </div>}
              </div>
              <div className="formField">
                <p>Dashboard</p>
                <input
                  type="text"
                  name="dashboard"
                  placeholder="Name"
                  onChange={this.onChange}
                  value={this.state.password}
                />
                {errors.password && (
                  <div className="invalid"> {errors.password} </div>
                )}
              </div>
            </div>
            <button className="btn" type="submit">
              <span>Add</span>
            </button>
            <button className="btn" type="submit">
              <span>Cancel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Company;
