import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

export default class Patients extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    const {children} = this.props;
    return (
      <div className="container">
        <Helmet title="Patients" />
        <div className="row">
          <div className="col-xs-12">
            <h2>Patients</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Nav bsStyle="tabs" activeKey="1">
              <LinkContainer to="/patients/demographic">
                <NavItem eventKey={1}>Demographic</NavItem>
              </LinkContainer>
              <LinkContainer to="/patients/social">
                <NavItem eventKey={2}>Social</NavItem>
              </LinkContainer>
              <LinkContainer to="/patients/alcohol">
                <NavItem eventKey={3}>Alcohol</NavItem>
              </LinkContainer>
            </Nav>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
