const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
        <div>
          <img src="./Vector.png" alt="search" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
    </div>
  );
};

export default Search;
