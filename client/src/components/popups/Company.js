import React, { Component } from "react";
import { addCompany } from "../../actions/companyActions";
import TextFieldGroup from "../common/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Company extends Component {
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
    const company = {
      name: this.state.name,
      handle: this.state.handle
    };

    this.props.addCompany(company, this.props.history);
    alert("company added");
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
                <input
                  type="text"
                  name="name"
                  placeholder="Ex.Fontys University of Applied Sciences"
                  onChange={this.onChange}
                  value={this.state.name}
                />
                {errors.name && <div className="invalid"> {errors.name} </div>}
              </div>
              <div className="formField">
                <p>Handle</p>
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

Company.propTypes = {
  addCompany: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCompany }
)(Company);
