import React, { useState, useEffect, useContext } from "react";
import { EventBus } from "../game/EventBus";
import dbUtility from "./Database/dbUtility";
import InputForm from "./Components/InputForm"; //Input form component
import HighscoreList from "./Components/HighscoreList";
import { UserContext } from "./../UserContext"; // Local stored user information
import { UserHighscoreNumber } from "./types";
import { Screen } from "../App";

var score = "";
// Subscribe to score updates
EventBus.on("score", (data: number) => {
    score = data.toString();
});

let isCalled = true;



interface FrontPageProps {
    setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}



const PostGame: React.FC<FrontPageProps> = ({ setScreen }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [weeklyHighscores, setWeeklyHighscores] = useState<UserHighscoreNumber[]>([]);
    const userInfo = useContext(UserContext);
    userInfo.score = score;
    

    useEffect(() => {
        console.log("isCalled state: " + isCalled)
        if(isCalled){
            isCalled = false;
            checkUserInfo();           
        }
        
    }, []);

    const checkUserInfo = async () => {
        if (JSON.parse(localStorage.getItem("userinfo")!) != null) {
            console.log("Local Storage exists: " + JSON.parse(localStorage.getItem("userinfo")!))

            const { data, error } = await dbUtility.CheckUserData(
                JSON.parse(localStorage.getItem("userinfo")!),
                "sdsusers"
            );
            console.log("Does user exist in DB: " + data);
            if (data) {
                console.log("Local Storage Matches Database entry:" + data)
                //console.log(isSignedIn);
                userInfo.userInfo = JSON.parse(localStorage.getItem("userinfo")!);
                dbUtility.UpdateScore(
                    userInfo.userInfo,
                    parseInt(userInfo.score)
                );
                handleSignUp();
                userInfo.userExist = true;
            } else {
                console.log("Removed " + JSON.parse(localStorage.getItem("userinfo")!) + " from localstorage");
                localStorage.removeItem("userinfo");
                userInfo.userExist = false;
                
            }
        }
    };  

    const handleSignUp = () => {
        setIsSignedIn(true);
        dbUtility.GetHighscore().then((highscores) => {
            setWeeklyHighscores(highscores);
        });
    };

    return (
        <div>
            <img
                src="/assets/is-logo.png"
                alt="IS Logo"
                className="islogo"
            ></img>

                {isSignedIn ? (
                    <>
                    <HighscoreList
                        highscores={weeklyHighscores}
                        loaduserscore={true}
                    ></HighscoreList>

                    <div id="buttonctn">
                        <input
                            className="buttonwhitesmall"
                            type="submit"
                            onClick={() => setScreen("game")}
                            value="Play Again"
                        />
                    </div>
                    </>
                ) : (
                    <>
                    <InputForm
                        onSignUp={handleSignUp}
                        score={parseInt(userInfo.score)}
                    />
                    </>

                )}
            
        </div>
    );
};

export default PostGame;
