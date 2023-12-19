import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { toast } from "react-toastify";
import { NUMBER_REGEX, TOAST_CONFIG } from "../constants";
import { updatePlayerData } from "../store/mainSlice";
import { useAppDispatch } from "../store/store";
import { playersType } from "../types/fetchDataType";

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
              if (value.match(NUMBER_REGEX)) {
                setPlayerAge(value.trim());
              }
            }}
          />
        </TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={() => {
              if (
                playerName === playerObj.name &&
                playerAge === playerObj.age
              ) {
                toast.info("No Changes detected!", TOAST_CONFIG);
                return;
              }
              if (!playerName.trim() || !playerAge) {
                toast.error("Player name and age are required!", TOAST_CONFIG);
              } else {
                dispatch(
                  updatePlayerData({
                    age: parseInt(String(playerAge)),
                    id: playerObj.id,
                    name: playerName,
                  })
                );
                toast.success("Player Details Saved!", TOAST_CONFIG);
              }
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
