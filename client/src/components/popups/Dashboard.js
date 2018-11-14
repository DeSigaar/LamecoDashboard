import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDashboard, getCompanies } from "../../actions/companyActions";
import TextFieldGroup from "../common/TextField";
import isEmpty from "../../validation/is-empty";
import removeSpecial from "../../validation/remove-special";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      companyId: "",
      name: "",
      handle: "",
      handleTyped: false,
      errors: {}
    };
  }

  componentWillMount = () => {
    const { companyList, companyId } = this.props;
    this.setState({ companyList, companyId });
  };

  componentDidMount = () => {
    const { companyId } = this.state;
    if (!isEmpty(companyId)) {
      this.handleSelectClick(companyId);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onKeyUp = e => {
    const { handleTyped } = this.state;
    let { name, value } = e.target;

    if (name === "name") {
      if (e.key !== " ") {
        value = removeSpecial(value);
        value = value.trim().replace(/\s+/g, " ");

        this.setState({ name: value });
        if (!handleTyped) {
          value = removeSpecial(value);
          value = value.trim().replace(/\s+/g, "-");

          this.setState({ handle: value });
        }
      }
    } else if (name === "handle") {
      this.setState({ handleTyped: true });

      if (e.key !== " ") {
        value = removeSpecial(value);
        value = value.trim().replace(/\s+/g, "-");

        this.setState({ handle: value });
      }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { companyId, name, handle } = this.state;
    const { addDashboard, closePopup, getCompanies } = this.props;

    addDashboard({ company: companyId, name, handle }, () => closePopup());
    getCompanies();
  };

  handleCloseClick = e => {
    const { closePopup } = this.props;
    closePopup();
  };

  handleSelectClick = id => {
    let companyId = id;
    this.setState({ companyId });

    // Remove any selected items
    var elements = document.querySelectorAll(".selected");
    [].forEach.call(elements, function(el) {
      el.classList.remove("selected");
    });

    // Highlight item in list
    if (!isEmpty(companyId)) {
      const selectedItem = document.getElementById(companyId);

      if (!isEmpty(selectedItem)) {
        selectedItem.classList.add("selected");
      }
    }
  };

  renderCompanyList = () => {
    const { companyList } = this.state;

    return (
      <div className="companyList">
        <ul className="list">
          {companyList.map((company, i) => {
            return (
              <li
                key={i}
                id={company.id}
                className="selectList"
                onClick={() => this.handleSelectClick(company.id)}
              >
                {company.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { errors, name, handle } = this.state;

    return (
      <div className="popupContainer">
        <form onSubmit={this.onSubmit}>
          <div className="middleForm">
            <div className="formField" id="selectCompanyDashboard">
              <p className="companyTitle">Select Company</p>
              {this.renderCompanyList()}
              {errors.company && (
                <div className="invalid"> {errors.company}</div>
              )}
            </div>
            <div className="formField">
              <p>Name</p>
              <TextFieldGroup
                type="text"
                name="name"
                placeholder="Name of dashboard"
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
                value={name}
                error={errors.name}
              />
            </div>
            <div className="formField">
              <p>Handle</p>
              <TextFieldGroup
                type="text"
                name="handle"
                placeholder="Handle of dashboard"
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
                value={handle}
                error={errors.handle}
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
              onClick={this.handleCloseClick}
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
  companyId: PropTypes.string,
  addDashboard: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addDashboard, getCompanies }
)(Dashboard);
