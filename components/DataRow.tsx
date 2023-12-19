import { Button, TextField } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { updatePlayerData } from "../store/mainSlice";
import { useAppDispatch } from "../store/store";
import { playersType } from "../types/fetchDataType";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../constants";

const DataRow = (playerObj: playersType) => {
  const [playerName, setPlayerName] = useState(playerObj.name || "");
  const [playerAge, setPlayerAge] = useState(playerObj.age || "");
  const dispatch = useAppDispatch();
  return (
    <>
      <TableRow key={playerObj.id}>
        <TableCell>
          <TextField
            variant="filled"
            size="small"
            value={playerName}
            onChange={({ target: { value } }) => {
              setPlayerName(value);
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            variant="filled"
            size="small"
            value={playerAge}
            onChange={({ target: { value } }) => {
              setPlayerAge(value);
            }}
          />
        </TableCell>
        <TableCell>
          <Button
            size="small"
            onClick={() => {
              dispatch(
                updatePlayerData({
                  age: parseInt(String(playerAge)),
                  id: parseInt(String(playerObj.id)),
                  name: playerName,
                })
              );
              toast.success("Player Details Saved!", TOAST_CONFIG);
            }}
          >
            Save
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DataRow;
