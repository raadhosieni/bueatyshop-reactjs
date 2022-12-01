import { Fragment } from "react";
import MainNav from "./MainNav";
import Footer from "./Footer";
import Container from "../UI/Container";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNav />
      <Container>
        <main>{props.children}</main>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Layout;
