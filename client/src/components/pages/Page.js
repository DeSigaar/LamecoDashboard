import React, { Component } from "react";
import axios from "axios";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validCompany: false,
      validDashboard: false,
      loaded: false,
      company: {
        name: "",
        handle: this.props.match.params.company
      },
      dashboard: {
        name: "",
        handle: this.props.match.params.dashboard,
        content: ""
      }
    };

    let companies = {};
    let dashboards = {};

    axios.get(`/api/company/all`).then(res => {
      companies = res.data;
      axios.get(`/api/dashboard/all`).then(res => {
        dashboards = res.data;

        Object.entries(companies).forEach(([key, value]) => {
          if (value.handle === this.state.company.handle) {
            this.setState({
              validCompany: true,
              company: {
                name: value.name,
                handle: value.handle
              }
            });
          }
        });

        Object.entries(dashboards).forEach(([key, value]) => {
          if (value.handle === this.state.dashboard.handle) {
            this.setState({
              validDashboard: true,
              dashboard: {
                name: value.name,
                handle: value.handle,
                content: value.content
              }
            });
          }
        });

        if (this.state.validCompany && this.state.validDashboard) {
          this.setState({
            loaded: true
          });
          document.title = `${this.state.dashboard.name} – ${
            this.state.company.name
          } | Laméco Dashboard`;
        } else {
          document.title = "No dashboard found | Laméco Dashboard";
          this.setState({
            loaded: true
          });
        }
      });
    });
  }

  render() {
    let dashboard;
    if (this.state.loaded) {
      if (this.state.dashboard.content && this.state.dashboard.name) {
        dashboard = (
          <div>
            <p>
              This is a page with the URL: /{this.state.company.handle}/
              {this.state.dashboard.handle}
            </p>
            <p>Content of dashboard: {this.state.dashboard.content}</p>
          </div>
        );
      } else if (!this.state.dashboard.content && this.state.dashboard.name) {
        dashboard = (
          <div>
            <p>
              This is a page with the URL: /{this.state.company.handle}/
              {this.state.dashboard.handle}
            </p>
            <p>This dashboard has no content</p>
          </div>
        );
      } else {
        dashboard = (
          <div>
            <p>
              No dashboard found with the URL: /{this.state.company.handle}/
              {this.state.dashboard.handle}
            </p>
          </div>
        );
      }
    } else {
      dashboard = <div>Loading</div>;
    }

    return <div className="page">{dashboard}</div>;
  }
}

export default Page;
