import { Button, TextField } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { playersType } from "../types/fetchDataType";
import { useAppDispatch } from "../store/store";
import { addPlayer, updatePlayerData } from "../store/mainSlice";
import DataRow from "./DataRow";

const TableManager = ({ players }: { players: playersType[] }) => {
  const [newName, setNewName] = useState<null | string>("");
  const [newAge, setNewAge] = useState<null | string>("");
  const [activePlayerId, setActivePlayerId] = useState<number | undefined>(0);
  const [activeData, setActiveData] = useState<playersType>({
    name: "",
    age: 0,
    id: 0,
  });
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
                  addPlayer({ name: newName, age: parseInt(String(newAge)) })
                );
                setNewAge("");
                setNewName("");
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
