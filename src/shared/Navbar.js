import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HighlightButton from '../Dashboard/HighlightButton';
import FileUploadComponent from '../Dashboard/FileUploadComponent';
import Search from '../Dashboard/Search';
import { Col, Row } from 'reactstrap';

class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
  render () {
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../images/logo-mini.svg')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <Row style={{alignItems: 'center',  width: '100%'}} className="nav_items_upload">
            <Col lg={4} md={4} xs={12} sm={12}><Search /></Col>
            <Col lg={6} md={6} xs={12} sm={12}><FileUploadComponent /></Col>
            <Col lg={2} md={2} xs={12} sm={12}><HighlightButton /></Col>
          </Row>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
