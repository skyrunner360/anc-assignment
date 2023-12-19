import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableManager from "../components/TableManager";
import { populateApiData } from "../store/mainSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const { palette: colorPalette } = theme;

  const apiData = useAppSelector((state) => state.mainSlice.apiData);

  const getData = async () => {
    const data = await fetch(
      "https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e"
    ).then((d) => d.json());
    dispatch(populateApiData(data));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box>
        <ToastContainer />
        {apiData.length < 1 ? (
          <Box>
            <CircularProgress color="secondary" />
            <Box textAlign={"center"}>Loading...</Box>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={2} justifyContent={"center"} gap={2}>
              {apiData.map((obj) => (
                <Grid
                  item
                  p={6}
                  key={obj.game + +new Date()}
                  bgcolor={colorPalette.primary.main}
                >
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
                      key={teamsObj.team_name + +new Date()}
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
                          key={teamsObj.team_name + +new Date()}
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
