import React from "react";
import "./App.css";
import {createData, DataTable} from "./DataTable";
import {StyledEngineProvider} from "@mui/material/styles";
import SearchBar from "material-ui-search-bar";

const searchMessages = async (search_term) => {
  return await fetch("/logs/search/" + "?message=" + search_term)
    .then(res => res.json())
    .then(res => {
      const rows = [];
      res.map(x => {
        rows.push(createData(x.id, x.message, x.logLevel, x.timestamp));
      });
      rows.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
      return rows
    })
    .catch(err => {
      console.log(err);
      return [];
    });
}

function App(props) {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");

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
      <SearchBar
        placeholder={'Search message contents'}
        value={search}
        onChange={(newValue) => setSearch(newValue)}
        onRequestSearch={async () => {
          setData(await searchMessages(search))
        }}
      />
      <StyledEngineProvider injectFirst>
        <DataTable rows={data}/>
      </StyledEngineProvider>
    </header>
  </div>);
}

export default App;
