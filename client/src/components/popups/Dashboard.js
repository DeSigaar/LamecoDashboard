import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      name: "",
      handle: "",
      remember_me: false,
      errors: {}
    };
  }

  componentDidMount() {
    console.log(this.props.companyList[0].name);
    this.setState({ companyList: this.props.companyList });
    console.log(this.state.companyList);
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
    console.log(this.props.companyList);
    return (
      <div>
        <div className="loginContainer">
          <form onSubmit={this.onSubmit}>
            <div className="middleForm">
              <div className="formField">
                <p>Select Company</p>
                <div className="companyList">
                  <ul>
                    <li />
                  </ul>
                </div>
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
