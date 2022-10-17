import React from 'react';
import { useState } from 'react';
import './filterCheckbox.css';

function FilterCheckbox() {
    const [checked, setChecked] = useState(false);


    const hadnleFilter = () => {
        setChecked(!checked)
    }

    return (
        <div className="filterCheckbox">
            <input type="checkbox" className="filterCheckbox__custom" id="shortfilms" name="shortfilms" value="yes"
                onChange={hadnleFilter}></input>
            <label className={`${checked ? 'filterCheckbox__label filterCheckbox__label_turn-on' : 'filterCheckbox__label'}`}
                htmlFor="shortfilms">Короткометражки</label>
        </div>
    );
}

export default FilterCheckbox;
