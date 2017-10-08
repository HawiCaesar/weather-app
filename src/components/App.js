import React from "react";
import WeatherContainer from "../containers/WeatherContainer";
import styles from  "../style.css";

const App = () => (
  <div>
    <nav className="navbar navbar-default">
      <div className={styles.navbarh}>
        <a className="navbar-brand" href="#">Weather Info</a>
      </div>
    </nav>
    <WeatherContainer styles={styles}/>
  </div>
);


export default App;
