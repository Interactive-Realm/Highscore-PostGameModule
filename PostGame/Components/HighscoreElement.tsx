import { UserHighscore, UserHighscoreNumber } from "../types";

type Props = {
    rank: number;
    highscore: UserHighscoreNumber;
    cssid: string;
};

function formatScore(score: string, length: number = 4): string {
    return String(score).padStart(length, "0");
}

const HighscoreItem = ({ rank, highscore, cssid }: Props) => {
    return (
        <li id="highscore_element">
            <span id="highscore_element2">
                <span className="highscore_element3">
                    <span id="hsrank">{rank} </span>
                    <span className="hsname" id={cssid}>{highscore.name} </span>
                </span>
                
                <span id="hsscore">{formatScore(highscore.score)}</span>
            </span>
        </li>
    );
};

export default HighscoreItem;
