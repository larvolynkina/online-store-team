import './Footer.scss';
import githubIco from '../../assets/icons/github.svg';
import rsSchoolIco from '../../assets/icons/rs_school_js.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <a href="https://github.com/larvolynkina"><img src={githubIco} alt="github icon" /></a>
        <div className="footer__central">
          <a href="https://rs.school/js/"><img src={rsSchoolIco} alt="rsschool icon" /></a>
          <p>2022</p>
        </div>
        <a href="https://github.com/krevetka87"><img src={githubIco} alt="github icon" /></a>
      </div>
    </footer>
  );
}

export default Footer;
