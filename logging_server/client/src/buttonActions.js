import {createData} from "./DataTable";

const baseUrl = "/logs/search/"

const baseSearch = async (query) => {
  return await fetch(baseUrl + query)
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

export {baseSearch};

