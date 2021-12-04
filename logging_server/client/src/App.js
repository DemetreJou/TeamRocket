import React from "react";
import "./App.css";
import {createData, DataTable} from "./DataTable";
import {StyledEngineProvider} from "@mui/material/styles";
import {baseSearch} from "./buttonActions";
import {Button, TextField} from "@mui/material";
import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   root: {
//     background: 'white',
//     border: 0,
//     borderRadius: 3,
//     color: 'white',
//     height: 48,
//     marginBottom: "30px"
//     // padding: '30 30 30 30px',
//   },
// });



function App(props) {

  const [data, setData] = React.useState([]);
  const [messageSearch, setMessageSearch] = React.useState("");
  const [logLevelSearch, setLogLevelSearch] = React.useState("");
  const [totalSearch, setTotalSearch] = React.useState("");

  const construct_search_query = () => {
    let query = "?"
    if (messageSearch !== "") {
      query += "message=" + messageSearch
    }
    if (logLevelSearch !== "") {
      if (query !== "") {
        query += "&"
      }
      query += "level=" + logLevelSearch
    }
    setTotalSearch(query)
  }


  React.useEffect(() => {
    fetch("/logs/search")
      .then(res => res.json())
      .then(res => {
        const rows = [];
        res.map(x => {
          rows.unshift(createData(x.id, x.message, x.logLevel, x.timestamp));
        });
        rows.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        setData(rows);
      })
      .catch(err => console.log(err));
  }, []);
  return (<div className="App">
    <header className="App-header">
      <h2>{"Distributed Logging and Monitoring System"}</h2>
      <TextField
        style={{
          marginBottom: "10px"
        }}
        id="outlined-name"
        label="Message Search"
        variant={'outlined'}
        value={messageSearch}
        onChange={(newValue) => {
          setMessageSearch(newValue.target.value)
        }}
      />
      <TextField
        style={{
          marginBottom: "10px"
        }}
        id="outlined-name"
        label="Log Level Search"
        variant={'outlined'}
        value={logLevelSearch}
        onChange={(newValue) => {
          setLogLevelSearch(newValue.target.value)
        }}
      />
      <Button
        style={{
          marginBottom: "10px"
        }}
        color={'primary'}
        variant={'contained'}
        id={'Search'}
        onClick={async () => {
          console.log(totalSearch)
          construct_search_query()
          setData(await baseSearch(totalSearch));
        }}>
        Search
      </Button>
      <StyledEngineProvider injectFirst>
        <DataTable
          rows={data}
        />
      </StyledEngineProvider>
    </header>
  </div>);
}

export default App;
