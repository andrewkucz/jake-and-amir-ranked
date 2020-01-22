import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function MenuBar(props) {
    return (
      <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" fixed="top">
      <Navbar.Brand href="/">Jake & Amir Ranked</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Link to={'/'} className="nav-link">Vote</Link>
        <Link to={'/leaderboard'} className="nav-link">Leaderboard</Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }