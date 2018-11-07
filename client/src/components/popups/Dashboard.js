import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextField";
import PropTypes from "prop-types";
import { addDashboard } from "../../actions/companyActions";
import { getCompanies } from "../../actions/companyActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      dashboardList: [],
      companyId: "",
      name: "",
      handle: "",
      remember_me: false,
      errors: {}
    };

    this.handleSelectClick = this.handleSelectClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      companyList: this.props.companyList
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company.company.companies) {
      this.setState({
        companyList: nextProps.company.company.companies,
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const dashboard = {
      company: this.state.companyId,
      name: this.state.name,
      handle: this.state.handle
    };
    this.props.addDashboard(dashboard);
    this.props.getCompanies();
    this.props.closePopup();
  };

  handleCloseClick = e => {
    this.props.closePopup();
  };

  handleSelectClick = id => {
    let companyId = id;
    this.setState({ companyId });
  };

  renderCompanyList = () => {
    return (
      <div className="companyList">
        <ul className="list">
          {this.state.companyList.map((company, i) => {
            return (
              <li key={i} onClick={() => this.handleSelectClick(company.id)}>
                {/* {console.log(company)} */}
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
      <div className="popupContainer">
        <form onSubmit={this.onSubmit}>
          <div className="middleForm">
            <div className="formField" id="selectCompanyDashboard">
              <p>Select Company</p>
              {this.renderCompanyList()}
            </div>
            <div className="formField">
              <p>Dashboard</p>
              <TextFieldGroup
                type="text"
                name="name"
                placeholder="Ex. Fontys"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
              />
            </div>
            <div className="formField">
              <p>Dashboard handle</p>
              <TextFieldGroup
                type="text"
                name="handle"
                placeholder="Ex. Fontys"
                onChange={this.onChange}
                value={this.state.handle}
                error={errors.name}
              />
            </div>
          </div>
          <div>
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
          </div>
        </form>
      </div>
    );
  }
}

Dashboard.propTypes = {
  addDashboard: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addDashboard, getCompanies }
)(Dashboard);
