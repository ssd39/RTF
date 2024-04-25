import React, { useEffect, useMemo, useState } from "react";
import "./Game.css";
import Stack from "@mui/material/Stack";
import Button from "../Component/Button";
import WalletIcon from "@mui/icons-material/Wallet";
import Select from "../Component/Select";
import { MenuItem } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { indexActionMap } from "../Core/actions";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

export default function Game() {
  const [isJoined, setJoined] = useState(false);
  const [mineMoves, setMineMoves] = useState([-1, -1, -1, -1]);
  const [opponentMoves, setOpponentsMove] = useState([-1, -1, -1]);
  const [isLock, setLock] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [round, setRound] = useState(0)

  // Function to create a new bubble
  const createBubble = () => {
    const newBubble = {
      id: Date.now(),
      createdAt: Date.now(),
      isMine: false
    };
    setBubbles([...bubbles, newBubble]);

    // Remove the bubble after 30 seconds
    setTimeout(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.filter((bubble) => bubble.id !== newBubble.id)
      );
    }, 30000);
  };

  const slectedCount = useMemo(() => {
    let c = 0;
    for (let i = 0; i < 4; i++) {
      if (mineMoves[i] != -1) {
        c++;
      }
    }
    return c;
  }, [mineMoves]);

  useEffect(() => {
    if (isJoined) {
      createBubble();
    }
  }, [isJoined]);

  return (
    <div className="h-[100vh] w-[100wv] game-board flex">
      {isJoined ? (
        <div className="flex w-full h-full game-board-child">
          <div className="absolute w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mt-2 bg-black p-2 rounded-full text-white">
              <span className="text-green-600">Round</span>
              <span className="text-white font-bold ml-2">1</span>
            </div>
            <div className=" mt-2 bg-black p-2 rounded-full text-white">
              <AccessAlarmIcon />
              <span className="text-white font-bold ml-2">00:30</span>
            </div>
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="left-panel">
              <div
                onClick={() => {
                  setMineMoves([0, ...mineMoves.slice(1, mineMoves.length)]);
                }}
                className={`flex flex-col items-center rounded-md border p-1 cursor-pointer select-none active:scale-90 ${
                  mineMoves[0] != -1 ? "border-green-500" : ""
                }`}
              >
                <span className="text-2xl text-white font-bold">
                  {indexActionMap[0].icon}
                </span>
                <span className="text-2xl text-white font-bold">
                  {indexActionMap[0].name}
                </span>
              </div>
              <div className="flex flex-col items-center rounded-md border border-white p-1 mt-4 cursor-pointer select-none active:scale-90">
                <span className="text-2xl text-white font-bold">LOL</span>
                <span className="text-2xl text-white font-bold">LOL</span>
              </div>
              <div className="flex flex-col items-center rounded-md border border-white mt-4 p-1 cursor-pointer select-none active:scale-90">
                <span className="text-2xl text-white font-bold">LOL</span>
                <span className="text-2xl text-white font-bold">LOL</span>
              </div>
              <div className="flex flex-col items-center rounded-md border border-white mt-4 p-1 cursor-pointer select-none active:scale-90">
                <span className="text-2xl text-white font-bold">LOL</span>
                <span className="text-2xl text-white font-bold">LOL</span>
              </div>
              <div
                className={`flex flex-col items-center rounded-md border mt-4 p-1 cursor-pointer select-none active:scale-90 ${
                  isLock ? "border-green-500" : ""
                }`}
                onClick={()=>setLock(true)}
              >
                <span className="text-2xl text-white font-bold">
                  {isLock ? "🔒" : "🔓"}
                </span>
                <span className="text-lg text-white font-bold">
                  {isLock ? "Locked" : "Lock Move"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="flex-1 flex flex-col items-end justify-end">
              <div className="flex">
                <div className="flex items-center justify-center my-2 p-1 bg-black">
                  <span className="text-white">Head</span>
                </div>
                <div className="flex flex-col items-center rounded-md border border-white p-1 select-none w-16">
                  <span className="text-2xl text-white font-bold">40</span>
                  <span className="text-lg text-white font-bold">/40</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center justify-center mt-6 my-2 p-1 bg-black">
                  <span className="text-white">Torso</span>
                </div>
                <div className="flex flex-col items-center rounded-md border border-white mt-4 p-1 select-none w-16">
                  <span className="text-2xl text-white font-bold">80</span>
                  <span className="text-lg text-white font-bold">/80</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center justify-center mt-6 my-2 p-1 bg-black">
                  <span className="text-white">Heatsink</span>
                </div>
                <div className="flex flex-col items-center rounded-md border border-white mt-4 p-1 select-none w-16">
                  <span className="text-2xl text-white font-bold">60</span>
                  <span className="text-lg text-white font-bold">/60</span>
                </div>
              </div>
            </div>
            <div className="w-[20%] flex flex-col items-center justify-center">
              <div className="bubble-container">
                {bubbles.map((bubble) => (
                  <div
                    key={bubble.id}
                    className="bubble"
                    style={{ backgroundColor: bubble.isMine ? "red" : "blue" }}
                  >
                    <span className="text-white">-10</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-black rounded-full absolute">
                <img src="/boxing-gloves.png" />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex">
                <div className="flex flex-col items-center rounded-md border border-white p-1 select-none w-16">
                  <span className="text-2xl text-white font-bold">40</span>
                  <span className="text-lg text-white font-bold">/40</span>
                </div>
                <div className="flex items-center justify-center my-2 p-1 bg-black">
                  <span className="text-white">Head</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center rounded-md border border-white mt-4 p-1 select-none w-16">
                  <span className="text-2xl text-white font-bold">80</span>
                  <span className="text-lg text-white font-bold">/80</span>
                </div>
                <div className="flex items-center justify-center mt-6 my-2 p-1 bg-black">
                  <span className="text-white">Torso</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center rounded-md border border-white mt-4 p-1 select-none w-16">
                  <span className="text-2xl text-white font-bold">60</span>
                  <span className="text-lg text-white font-bold">/60</span>
                </div>
                <div className="flex items-center justify-center mt-6 my-2 p-1 bg-black">
                  <span className="text-white">Heatsink</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="right-panel">
              <div
                onClick={() => {
                  setMineMoves([0, ...mineMoves.slice(1, mineMoves.length)]);
                }}
                className={`flex flex-col items-center min-h-8 rounded-md border p-1 cursor-pointer select-none ${
                  opponentMoves[0] != -1 ? "border-green-500" : "border-white"
                }`}
              >
                <span className="text-2xl text-white font-bold">
                  {indexActionMap[0].icon}
                </span>
                <span className="text-2xl text-white font-bold">
                  {indexActionMap[0].name}
                </span>
              </div>
              <div
                className={`flex flex-col items-center min-h-8 rounded-md border p-1 mt-4 cursor-pointer select-none ${
                  opponentMoves[1] != -1 ? "border-green-500" : "border-white"
                }`}
              >
                <span className="text-2xl text-white font-bold">LOL</span>
                <span className="text-2xl text-white font-bold">LOL</span>
              </div>
              <div
                className={`flex flex-col items-center min-h-[4.5rem] rounded-md border mt-4 p-1 cursor-pointer select-none ${
                  opponentMoves[2] != -1 ? "border-green-500" : "border-white"
                }`}
              >
                <span className="text-2xl text-white font-bold"></span>
                <span className="text-2xl text-white font-bold"></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <Stack spacing={2}>
            <Select label="Select NFT">
              <MenuItem value="1">LOL</MenuItem>
              <MenuItem value="2">LOL 1</MenuItem>
              <MenuItem value="3">LOL 2</MenuItem>
            </Select>
            <Button
              onClick={(e) => {
                setJoined(true);
              }}
            >
              <PlayArrowIcon />
              Join fight ring (1 RTF)
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}
