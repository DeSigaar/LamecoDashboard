import React, { Component } from "react";
import PropTypes from "prop-types";
import PopupHeader from "./PopupHeader";
import PopupBody from "./PopupBody";

class Popup extends Component {
  componentDidMount = () => {
    document.addEventListener("keydown", this.typeFunction, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.typeFunction, false);
  };

  typeFunction = e => {
    const { closePopup } = this.props;

    if (e.key === "Escape") {
      closePopup();
    }
  };

  handleClick = () => {
    const { closePopup } = this.props;
    closePopup();
  };

  render() {
    const {
      companyList,
      title,
      companyId,
      id,
      name,
      handle,
      closePopup
    } = this.props;

    let PopupBodyContent;
    if (title !== "") {
      PopupBodyContent = (
        <PopupBody
          title={title}
          companyId={companyId}
          id={id}
          name={name}
          handle={handle}
          closePopup={() => closePopup()}
          companyList={companyList}
        />
      );
    } else {
      PopupBodyContent = <div>Niks</div>;
    }

    return (
      <div className="card">
        <div className="cardBackground" onClick={() => this.handleClick()} />
        <div className="cardContent ">
          <PopupHeader title={title} />
          {PopupBodyContent}
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  companyId: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  handle: PropTypes.string,
  closePopup: PropTypes.func.isRequired,
  companyList: PropTypes.array
};

export default Popup;
