import React, { Component } from "react";
import { addCompany } from "../../actions/companyActions";
import TextFieldGroup from "../common/TextField";
import PropTypes from "prop-types";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      handle: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const company = {
      name: this.state.name,
      handle: this.state.handle
    };
    this.props.addCompany(company);
    // TODO add snackbar here and close popup if possible
    this.props.getCompanies();
    this.props.closePopup();
    // setTimeout(() => {
    //   this.props.closePopup();
    // }, 500);
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
                <p>Company</p>
                <TextFieldGroup
                  type="text"
                  name="name"
                  placeholder="Ex.Fontys University of Applied Sciences"
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                />
              </div>
              <div className="formField">
                <p>Handle</p>
                <TextFieldGroup
                  type="text"
                  name="handle"
                  placeholder="Ex. Fontys"
                  onChange={this.onChange}
                  value={this.state.handle}
                  error={errors.handle}
                />
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

Company.propTypes = {
  addCompany: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCompany, getCompanies }
)(Company);
