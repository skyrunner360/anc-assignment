import { Button, TextField } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { addPlayer } from "../store/mainSlice";
import { useAppDispatch } from "../store/store";
import { playersType } from "../types/fetchDataType";
import DataRow from "./DataRow";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "../constants";

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
              onChange={(e) => setNewName(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Player Age"
              variant="filled"
              placeholder="Enter Player Age"
              size="small"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <Button
              size="small"
              onClick={() => {
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
