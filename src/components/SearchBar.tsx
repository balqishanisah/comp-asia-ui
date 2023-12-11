import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({}) => {
  const [input, setInput] = useState("");
  return (
    <div className="input-wrapper">
      <Search sx={{ color: "#212121" }} />
      <input
        placeholder="Type to search.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
