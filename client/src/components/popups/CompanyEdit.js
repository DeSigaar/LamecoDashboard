import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editCompany, getCompanies } from "../../actions/companyActions";
import TextFieldGroup from "../common/TextField";
import removeSpecial from "../../validation/remove-special";

class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      handle: "",
      errors: {}
    };
  }

  componentWillMount = () => {
    const { id, name, handle } = this.props;
    this.setState({ id, name, handle });
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
    let { name, value } = e.target;

    if (name === "name") {
      if (e.key !== " ") {
        value = removeSpecial(value);
        value = value.trim().replace(/\s+/g, " ");

        this.setState({ name: value });
      }
    } else if (name === "handle") {
      if (e.key !== " ") {
        value = removeSpecial(value);
        value = value.trim().replace(/\s+/g, "-");

        this.setState({ handle: value });
      }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { id, name, handle } = this.state;
    const { editCompany, closePopup, getCompanies } = this.props;

    editCompany({ id, name, handle }, () => closePopup());
    getCompanies();
  };

  handleClick = e => {
    const { closePopup } = this.props;
    closePopup();
  };

  render() {
    const { errors, id, name, handle } = this.state;

    return (
      <div className="popupContainer">
        <form onSubmit={this.onSubmit}>
          <input type="hidden" name="id" value={id} />
          <div className="middleForm">
            <div className="formField">
              <p>Name</p>
              <TextFieldGroup
                type="text"
                name="name"
                placeholder="Name of company"
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
                placeholder="Handle of company"
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
                value={handle}
                error={errors.handle}
              />
            </div>
          </div>
          <div>
            <button className="btn" type="submit">
              <span>Edit</span>
            </button>
            <button className="btn" onClick={this.handleClick}>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

CompanyEdit.propTypes = {
  editCompany: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editCompany, getCompanies }
)(CompanyEdit);
