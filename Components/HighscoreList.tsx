import { useContext } from "react";
import HighscoreItem from "./HighscoreElement";
import dbUtility from "../Database/dbUtility";
import { UserHighscoreNumber } from "../types";
import { UserContext } from "../../UserContext";

type Props = {
    highscores: UserHighscoreNumber[];
    loaduserscore: boolean;
};

const HighscoreList = ({ highscores, loaduserscore }: Props) => {
    const userInfo = useContext(UserContext);

    return (
        <div id="highscore">
            <div id="titlecontainer">
                <h2 id="subtitle">SOAPBOX SHOWDOWN</h2>
                {loaduserscore ? (
                    <div>
                        <p id="highscore_element" className="scoreTitle">Your Score</p>
                        <p className="scoreText">{userInfo.score}</p>
                    </div>
                ) : (
                    <div />
                )}

                <h1 id="title">Leaderboard</h1>
            </div>
            <ul id="highscore_list">
                {highscores.map((item, i) =>
                    i == 2 ? (
                        <div id="highscore_element3">
                            <HighscoreItem
                                key={item.phonenumber}
                                rank={i + 1}
                                highscore={item}
                                cssid=""
                            />
                            <hr id="line_top3"></hr>
                        </div>
                    ) : (
                        <div id="highscore_element3">
                            <HighscoreItem
                                key={item.phonenumber}
                                rank={i + 1}
                                highscore={item}
                                cssid=""
                            />
                        </div>
                    )
                )}
            </ul>
        </div>
    );
};

export default HighscoreList;
