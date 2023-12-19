import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import TableManager from "../components/TableManager";
import { populateApiData } from "../store/mainSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();
  const getData = async () => {
    const data = await fetch(
      "https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e"
    ).then((data) => data.json());
    dispatch(populateApiData(data));
  };
  const theme = useTheme();
  const { palette: colorPalette } = theme;
  const apiData = useAppSelector((state) => state.mainSlice.apiData);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box>
        <ToastContainer />
        {!apiData ? (
          <Box>
            <CircularProgress />
            <Box textAlign={"center"}>Loading...</Box>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={2} justifyContent={"center"} gap={2}>
              {apiData.map((obj) => (
                <Grid item p={6} bgcolor={colorPalette.primary.main}>
                  <Box>
                    <Typography
                      fontWeight={700}
                      align="center"
                      color={colorPalette.getContrastText(
                        colorPalette.primary.main
                      )}
                    >
                      {obj.game}
                    </Typography>
                  </Box>
                  {obj.teams.map((teamsObj) => (
                    <TableContainer
                      component={Paper}
                      sx={{ m: 2, maxHeight: 450 }}
                    >
                      <Table sx={{ maxWidth: 500 }} stickyHeader>
                        <TableHead sx={{ backgroundColor: "#CEC3C1" }}>
                          <TableRow selected>
                            <TableCell>
                              {teamsObj.team_name}{" "}
                              <b>({teamsObj.players.length})</b>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableManager
                          key={teamsObj.team_name}
                          players={teamsObj.players}
                          teamName={teamsObj.team_name}
                        />
                      </Table>
                    </TableContainer>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}

export default App;
