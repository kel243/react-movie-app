import React from "react";
import { Menu } from "antd";
import "./Navbar.css";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a class="nav-links" href="/">
          Home
        </a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a class="nav-links" href="/favorite">
          Favorites
        </a>
      </Menu.Item>
      <Menu.Item key="search">
        <a class="nav-links" href="/search">
          Search
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
