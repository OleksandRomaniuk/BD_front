import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from "react-bootstrap"

function Navigation(menus){
        const menuItems = []
        menus.data.forEach((data) => {
            menuItems.push( <Nav.Link href={data.link}>{data.name}</Nav.Link>)
          })
        return(
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Навігація</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Nav.Link href="/">Головна</Nav.Link>
                        <Nav.Link href="/show">Перегляд</Nav.Link> */}
                        {menuItems}
                    </Nav>
                </Container>
            </Navbar>
        )
  }

  export default Navigation