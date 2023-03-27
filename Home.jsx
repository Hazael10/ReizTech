import { useEffect, useState } from "react";
import CountryDetail from "./pages/CountryDetail";
import axios from "axios";

/**
 * • Fetch the data from the endpoint.
 * https://restcountries.com/v2/all?fields=name,region,area
 */
function Home() {
  const [countries, setCountries] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((result) => result.json())
      .then((res) => {
        setCountries(res);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name,region,area")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSortByName = () => {
    const sortedCountries = [...countries].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setCountries(sortedCountries);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name,region,area")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterByArea = () => {
    const filteredCountries = countries.filter(
      (country) => country.area < 65300
    );
    setCountries(filteredCountries);
    setFilterBy("area");
  };

  const handleFilterByRegion = () => {
    const filteredCountries = countries.filter(
      (country) => country.region === "Oceania"
    );
    setCountries(filteredCountries);
    setFilterBy("region");
  };

  const handleResetFilters = () => {
    axios
      .get("https://restcountries.com/v2/all?fields=name,region,area")
      .then((response) => setCountries(response.data));
    setFilterBy("all");
  };

  return (
    <section className="container-fluid ">
      <div>
        <div className="filter-button d-grid gap-2 d-md-block">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleFilterByArea}
            id="area"
          >
            Filter by Area (smaller than Lithuania)
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleFilterByRegion}
            id="region"
          >
            Filter by region (Oceania)
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleResetFilters}
            id="reset"
          >
            Reset filters
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm "
            onClick={handleSortByName}
            id="sort"
          >
            Sort ({sortOrder === "asc" ? "ASC" : "DESC"})
          </button>
        </div>
      </div>
      <div className="input-container">
        {/* 3. Display data */}
        {countries?.map((country, index) => (
          <CountryDetail country={country} key={index} />
        ))}
      </div>
    </section>
  );
}

export default Home;
