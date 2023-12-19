import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { addPlayer } from "../store/mainSlice";
import { useAppDispatch } from "../store/store";
import { playersType } from "../types/fetchDataType";
import DataRow from "./DataRow";
import { toast } from "react-toastify";
import { NUMBER_REGEX, TOAST_CONFIG } from "../constants";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const TableManager = ({
  players,
  teamName,
}: {
  players: playersType[];
  teamName: string;
}) => {
  const [newName, setNewName] = useState<null | string>("");
  const [newAge, setNewAge] = useState<null | string>("");
  const dispatch = useAppDispatch();

  return (
    <>
      <TableBody>
        <TableRow
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
            },
          }}
        >
          <TableCell>
            <TextField
              label="New Player Name"
              variant="filled"
              placeholder="Enter Player Name"
              size="small"
              value={newName}
              onChange={({ target: { value } }) => setNewName(value)}
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Player Age"
              variant="filled"
              placeholder="Enter Player Age"
              size="small"
              value={newAge}
              onChange={({ target: { value } }) => {
                if (value.match(NUMBER_REGEX)) {
                  setNewAge(value.trim());
                }
              }}
            />
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<PlaylistAddIcon />}
              onClick={() => {
                if (!newName?.trim() || !newAge?.trim()) {
                  toast.error(
                    "Player name and age are required!",
                    TOAST_CONFIG
                  );
                } else {
                  dispatch(
                    addPlayer({
                      name: newName,
                      age: parseInt(String(newAge)),
                      teamName,
                    })
                  );
                  setNewAge("");
                  setNewName("");
                  toast.success("New Player Added Successfully!", TOAST_CONFIG);
                }
              }}
            >
              Add
            </Button>
          </TableCell>
        </TableRow>
        {players.map((playerObj) => (
          <DataRow
            age={playerObj.age}
            name={playerObj.name}
            id={playerObj.id}
            key={playerObj.id}
          />
        ))}
      </TableBody>
    </>
  );
};

export default TableManager;
