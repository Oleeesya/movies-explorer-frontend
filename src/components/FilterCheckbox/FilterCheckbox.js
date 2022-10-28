import React from 'react';
import './filterCheckbox.css';

function FilterCheckbox(props) {
    return (
        <div className="filterCheckbox">
            <input type="checkbox" className="filterCheckbox__custom" id="shortfilms" name="shortfilms" value="yes"
                onChange={props.handleShortFilm}></input>
            <label className={`${props.shortFilm ? 'filterCheckbox__label filterCheckbox__label_turn-on' : 'filterCheckbox__label'}`}
                htmlFor="shortfilms" >Короткометражки</label>
        </div>
    );
}

export default FilterCheckbox;
