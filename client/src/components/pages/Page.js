import React, { Component } from "react";
import axios from "axios";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.match.params.company,
      dashboard: this.props.match.params.dashboard,
      validCompany: false,
      validDashboard: false,
      loaded: false
    };

    let companies = {};
    let dashboards = {};

    axios.get(`/api/company/all`).then(res => {
      companies = res.data;
      axios.get(`/api/dashboard/all`).then(res => {
        dashboards = res.data;

        Object.entries(companies).forEach(([key, value]) => {
          if (value.handle === this.state.company) {
            this.setState({
              validCompany: true
            });
          }
        });

        Object.entries(dashboards).forEach(([key, value]) => {
          if (value.handle === this.state.dashboard) {
            this.setState({
              validDashboard: true
            });
          }
        });

        if (this.state.validCompany && this.state.validDashboard) {
          // Nothing? Because it is valid?
          this.setState({ loaded: true });
          document.title = `${this.state.dashboard} - ${
            this.state.company
          } | Laméco Dashboard`;
        } else {
          this.props.history.push("/");
        }
      });
    });
  }

  render() {
    // Add loading while we wait for the stuff to happen :)
    let dashboard;
    if (this.state.loaded) {
      dashboard = (
        <div>
          This is a page with the URL: /{this.state.company}/
          {this.state.dashboard}
        </div>
      );
    } else {
      dashboard = <div>Loading</div>;
    }

    return <div className="page">{dashboard}</div>;
  }
}

export default Page;
