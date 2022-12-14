/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/header";
import ScrollToTopPage from "../../components/scroll-to-top";
const { Content } = Layout;
const PublicLayout = () => {
  return (
    <Layout>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <ScrollToTopPage />
    </Layout>
  );
};

export default PublicLayout;
