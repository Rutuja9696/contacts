import { Component } from "react";
import styles from "../../styles/styles.module.css";
import pic from "../../../Images/contentstack-logo_White.png";
class Header extends Component {
  render() {
    return (
      <>
        <div className={styles.header}>
          <img src={pic} alt="Logo" />
        </div>
      </>
    );
  }
}
export default Header;
