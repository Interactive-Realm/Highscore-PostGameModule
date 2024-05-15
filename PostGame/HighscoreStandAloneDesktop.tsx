import React, { useState, useEffect, useContext } from "react";
import dbUtility from "./Database/dbUtility";
import { UserHighscoreNumber } from "./types";
import HighscoreItem from "./Components/HighscoreElement";

var isCalled = true;

const HighscoreDesktop = () => {
    const [highscore, setHighscores] = useState<UserHighscoreNumber[]>([]);

    useEffect(() => {
        console.log("UseEffect Test")

        if(isCalled){
            isCalled = false;
            dbUtility.GetHighscore().then((highscores) => {
                setHighscores(highscores);
                console.log(highscores);
                console.log(highscore);
            });
        }

        const interval = setInterval(() => {

            dbUtility.GetHighscore().then((highscores) => {
                setHighscores(highscores);
                console.log(highscore);
            });

            //UpdateHighscore();

        }, 15000);

        return () => clearInterval(interval);

            
    }, [])

    return (
        <div className="HighscoreDesktop">
            <div className="HSTopBar"> 
                <img src="/assets/is-logo.png" alt="IR Logo" className='hslogo'></img>
                <p className="titlecontainer subcolor subfont">SOAPBOX SHOWDOWN</p>
            </div>
           
            <p className="HSLeaderboardTitle mainfont">Leaderboard</p>


            {highscore.length > 0 ? (

            <div className="HSLeaderboard">
                <div className="top3">
                    <div className="n1ctn">
                    <HighscoreItem
                        key={highscore[0].phonenumber}
                        rank={1}
                        highscore={highscore[0]}
                        cssid="n1"
                    />
                    </div>
                    <div className="n2ctn">
                    <HighscoreItem
                        key={highscore[1].phonenumber}
                        rank={2}
                        highscore={highscore[1]}
                        cssid="n2"
                    />
                    </div>
                    <div className="n3ctn">
                    <HighscoreItem
                        key={highscore[2].phonenumber}
                        rank={3}
                        highscore={highscore[2]}
                        cssid="n3"
                    />
                    </div>
                </div>

                <div className="verticalLine"  />

                <div className="therest">
                    <HighscoreItem
                        key={highscore[3].phonenumber}
                        rank={4}
                        highscore={highscore[3]}
                        cssid=""
                    />
                    <HighscoreItem
                        key={highscore[4].phonenumber}
                        rank={5}
                        highscore={highscore[4]}
                        cssid=""
                    />
                    <HighscoreItem
                        key={highscore[5].phonenumber}
                        rank={6}
                        highscore={highscore[5]}
                        cssid=""
                    />
                    <HighscoreItem
                        key={highscore[6].phonenumber}
                        rank={7}
                        highscore={highscore[6]}
                        cssid=""
                    />
                    <HighscoreItem
                        key={highscore[7].phonenumber}
                        rank={8}
                        highscore={highscore[7]}
                        cssid=""
                    />
                    <HighscoreItem
                        key={highscore[8].phonenumber}
                        rank={9}
                        highscore={highscore[8]}
                        cssid=""
                    />
                    <HighscoreItem
                        key={highscore[9].phonenumber}
                        rank={10}
                        highscore={highscore[9]}
                        cssid=""
                    />

            </div>

            </div>        

            ):(
                <div/>
            )}
            

            <div className="HSfooter">
                <div className="HSfooter2">
                    <img src="/assets/IDQR2024.png" alt="IS Logo" className='QR'></img>
                    <div className="HSfooterText">
                        <span className="subtitle subfont">PLAY SOAPBOX SHOWDOWN</span>
                        <span className="subfont">APP.INTERACTIVE-REALM.COM/<span className="subfont subcolor">INSTITUTDYSTEN2024</span></span>
                    </div>
                </div>
                <div className="HSfooter3">
                    
                    <img src="/assets/SoMe.png" alt="IS Logo" className='QR'></img>  
                    <div className="HSfooterText2">
                        <span className="subtitle subfont">Follow us on Social Media</span>
                        <span className="subfont">Where we announce the <span className="subfont subcolor">Winner</span>!</span>
                    </div>                  
                </div>      
            </div>

   
        </div>
    );

};

export default HighscoreDesktop;
