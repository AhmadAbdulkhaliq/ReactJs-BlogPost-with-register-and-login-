import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import './App.css';

class Layout extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavLink className="navbar-brand" to="/">Re:Coded Blog</NavLink>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                            <NavLink to="/posts" className="nav-link" activeClassName="active">Posts</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/comments" className="nav-link" activeClassName="active">Comments</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/categories" className="nav-link" activeClassName="active">Categories</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/users" className="nav-link" activeClassName="active">Users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/posts" className="nav-link" activeClassName="active">Ahmad A. Osman</NavLink>
                            </NavItem>
                            <NavItem>
                            <img src="https://static.thenounproject.com/png/17241-200.png"
                            className="mx-3 currentUserImage" height="40px"
                            width="40px"/> 
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;
