export default function FilterAircrafts(filter: any, setFilter: Function) {
  return (
    <div>
      <div>Filter</div>
      <div className="filter-row">
        <span>Hexcode:</span>
        <input
          type="text"
          onChange={(event) => {
            setFilter({
              ...filter,
              hexcode: event.currentTarget.value,
            });
          }}
        />

        <span>Reg:</span>
        <input
          type="text"
          onChange={(event) => {
            setFilter({
              ...filter,
              reg: event.currentTarget.value,
            });
          }}
        />

        <span>Type:</span>
        <input
          type="text"
          onChange={(event) => {
            setFilter({
              ...filter,
              type: event.currentTarget.value,
            });
          }}
        />

        <span>Country:</span>
        <input
          type="text"
          onChange={(event) => {
            setFilter({
              ...filter,
              country: event.currentTarget.value,
            });
          }}
        />

        <span>Force:</span>
        <input type="text" />
      </div>
    </div>
  );
}
