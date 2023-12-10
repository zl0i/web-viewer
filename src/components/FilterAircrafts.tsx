import debounce from 'debounce';
import { memo } from 'react';

export default memo(function ({ filter, setFilter }: { filter: any; setFilter: Function }) {
  return (
    <div>
      <div>Filter</div>
      <div className="filter-row">
        <span>Hexcode:</span>
        <input
          type="text"
          onChange={debounce((event) => {
            setFilter({
              ...filter,
              hexcode: event.target.value,
            });
          }, 500)}
        />

        <span>Reg:</span>
        <input
          type="text"
          onChange={debounce((event) => {
            setFilter({
              ...filter,
              reg: event.target.value,
            });
          }, 500)}
        />

        <span>Type:</span>
        <input
          type="text"
          onChange={debounce((event) => {
            setFilter({
              ...filter,
              type: event.target.value,
            });
          }, 500)}
        />

        <span>Country:</span>
        <input
          type="text"
          onChange={debounce((event) => {
            setFilter({
              ...filter,
              country: event.target.value,
            });
          }, 500)}
        />
        <span>Last update:</span>
        <select
          name="last_update"
          id="last_update"
          onChange={(event) => {
            setFilter({
              ...filter,
              last_update_sign: event.target.value,
            });
          }}
        >
          <option value="after">After</option>
          <option value="before">Before</option>
        </select>
        <input
          type="date"
          onChange={debounce((event) => {
            setFilter({
              ...filter,
              last_update: event.target.value,
            });
          }, 500)}
        />

        {/* <span>Force:</span> */}
        {/* <input type="text" /> */}
      </div>
    </div>
  );
});
