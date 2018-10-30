import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      handle: "",
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

  handleClick = e => {
    this.props.closePopup();
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="loginContainer">
          <form onSubmit={this.onSubmit}>
            <div className="middleForm">
              <div className="formField">
                <p>Select Company</p>
                <input
                  type="text"
                  name="company"
                  placeholder="Ex.Fontys University of Applied Sciences"
                  onChange={this.onChange}
                  value={this.state.name}
                />
                {errors.name && <div className="invalid"> {errors.name} </div>}
              </div>
              <div className="formField">
                <p>Dashboards</p>
                <input
                  type="text"
                  name="handle"
                  placeholder="Ex. Fontys"
                  onChange={this.onChange}
                  value={this.state.handle}
                />
                {errors.handle && (
                  <div className="invalid"> {errors.handle} </div>
                )}
              </div>
            </div>
            <button className="btn" type="submit">
              <span>Add</span>
            </button>
            <button
              className="btn"
              type="submit"
              onClick={this.handleClick.bind(this)}
            >
              <span>Cancel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;
