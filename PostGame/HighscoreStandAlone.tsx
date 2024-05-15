import React, { useState, useEffect, useContext } from "react";
import dbUtility from "./Database/dbUtility";
import HighscoreList from "./Components/HighscoreList";
import { UserHighscoreNumber } from "./types";



function Highscore() {
    const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscoreNumber[]>([]);

    useEffect(() => {
        console.log("UseEffect Test")
        const interval = setInterval(() => {

            dbUtility.GetHighscore().then((highscores) => {
                setWeeklyHighscores(highscores);
                console.log("Test")
            });

            //UpdateHighscore();

        }, 15000);

        return () => clearInterval(interval);
            
    }, [])





    return (
        <div id="app">
            <img src="/assets/is-logo.png" alt="IS Logo" className='islogo'></img>

            <div>
                <HighscoreList
                    highscores={weeklyHighscores} loaduserscore={false}
                ></HighscoreList>         
            </div>
            <div className="qrctn">
            <img src="/assets/IDQR2024.png" alt="IS Logo" className='QR'></img>
            </div>


   
        </div>
    );

};

export default Highscore;
