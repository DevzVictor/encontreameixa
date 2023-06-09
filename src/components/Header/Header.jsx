import deskLogo from "../../assets/imgs/DESKTOP-LOGO.png";
import deskFrase from "../../assets/imgs/DESKTOP-FRASE.png";
import catarina from "../../assets/imgs/DESKTOP-CATARINA.png";
import catarinaMobile from "../../assets/imgs/MOBILE-CATARINA.png";
import instaIcon from "../../assets/icons/insta-icon-header.svg";
import linkedinIcon from "../../assets/icons/linkedin-icon-header.svg";
import "./Style.css";
import Form from "../Form/Form";

function Header({ getLocation, selectPosition, setSelectPosition }) {
  return (
    <header className="header-container">
      <div className="header-box">
        <div className="header-details">
          <img src={deskLogo} alt="logo" />
          <img src={catarinaMobile} alt="catarina"
            className="catarina-mobile"
          />
          <img src={deskFrase} alt="slogan" />
          <button onClick={getLocation}>
            <span>CLIQUE AQUI</span>
            <p>
              PARA DETECTAR <br /> SUA LOCALIZAÇÃO
            </p>
          </button>
          <Form
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
          />
        </div>
        <div className="header-catarina">
        <div className="header-icons">
          <a href="https://www.instagram.com/ameixagoiana/" target="blank">
            <img src={instaIcon} alt="Instagram Icon" />
          </a>
          <a href="https://www.linkedin.com/company/ameixagoiana/" target="blank">
            <img src={linkedinIcon} alt="Linkedin Icon" />
          </a>
        </div>
          <img className="catarina-desktop" src={catarina} alt="catarina" />
        </div>
      </div>
      <div className="header-corda" />
    </header>
  );
}

export default Header;
