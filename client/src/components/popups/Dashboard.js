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
    this.setState({
      companyList: this.props.companyList
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company.company.companies) {
      this.setState({
        companyList: nextProps.company.company.companies
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  handleCloseClick = e => {
    this.props.closePopup();
  };

  handleSelectClick = e => {
    let selectedItem = e.target.innerText;
    var myElements = document.querySelectorAll(".titleBar");
  };

  renderCompanyList = () => {
    return (
      <div className="companyList">
        <ul className="list">
          {this.state.companyList.map((company, i) => {
            return (
              <li key={i} onClick={this.handleSelectClick.bind(this)}>
                {company.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
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
                {this.renderCompanyList()}
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
              onClick={this.handleCloseClick.bind(this)}
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
