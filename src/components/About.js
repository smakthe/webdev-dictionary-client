import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1 className="about-heading">About Webdev Dictionary</h1>
      <p className="about-description">
        The Webdev Dictionary is your go-to app for exploring keywords related to web development and their definitions.<br/>
        Designed for web developers, it features:
      </p>
      <ul className="about-list">
        <li>Interactive and user-friendly interface.</li>
        <li>Seamless navigation through an alphabetical sidebar.</li>
        <li>Comprehensive word search with definitions.</li>
        <li>Responsive design for use on all devices.</li>
      </ul>
      <p className="about-thanks">
        Thank you for using the Webdev Dictionary! Hope it enhances your learning experience.<br/>
        For more information about me click <a href="https://somak-resume.vercel.app" target="blank">here</a>.
      </p>
    </div>
  );
};

export default About;
