import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.scss";
import Product from "./containers/Product/Product";
import Home from "./containers/Home/Home";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
import Header from "./Components/Header/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faPlus,
  faArrowRight,
  faArrowLeft,
  faAnglesLeft,
  faAnglesRight,
  faCircleUp,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import Publish from "./containers/Publish/Publish";
import Payment from "./containers/Payment/Payment";
library.add(
  faMagnifyingGlass,
  faPlus,
  faArrowRight,
  faArrowLeft,
  faAnglesLeft,
  faAnglesRight,
  faCircleUp,
  faCircleDown
);

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price-asc");

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <Routes>
        <Route
          path="/"
          element={<Home search={search} token={token} sort={sort} />}
        />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
