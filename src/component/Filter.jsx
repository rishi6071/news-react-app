import React, { createContext, useContext, useState } from 'react';
import './Filter.css';
import News from './News';
import FilterData from './FilterData';
import { BbcChecked } from './Navbar';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Creating Context for [Category, Country, Language]
const [Category, Country] = [createContext(), createContext()];

// Creating Styles
const useStyles = makeStyles((theme) => ({
    selectRoot: {
        //...other styles
        '&:focus': {
            backgroundColor: 'transparent'
        }
    }
}));

const Filter = () => {
    const bbcNews = useContext(BbcChecked);
    const [category, setCategory] = useState('General');
    const [country, setCountry] = useState('in');

    // On Changing Any Filter
    const handleChange = (event) => {
        const [name, value] = [event.target.name, event.target.value];
        if (name === 'category_filter_helper')
            setCategory(value);
        else if (name === 'country_filter_helper')
            setCountry(value);
    }

    const classes = useStyles();

    return (
        <>
            <Category.Provider value={category}>
                <Country.Provider value={country}>
                    <div className="container-lg mt-md-3 mt-2" style={{ display: (!bbcNews)? 'block': 'none'} }>
                        <div className="row">
                            {/* Category Select */}
                            <div className="col-xl-4 col-lg-5 col-md-6 col-12 offset-xl-2 offset-lg-1 filter_select_box">
                                <FormControl className="filter_select">
                                    <InputLabel id="category_filter" className="filter_label">Category</InputLabel>
                                    <Select
                                        labelId="category_filter"
                                        id="category_filter_helper"
                                        name="category_filter_helper"
                                        className="filter_field"
                                        value={category}
                                        onChange={handleChange}
                                        classes={{ root: classes.selectRoot }}
                                    >
                                        {
                                            FilterData.categories.map((category, cg_id) => {
                                                return <MenuItem value={category} key={`category-${cg_id}}`}>{category}</MenuItem>;
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            {/* Country Select */}
                            <div className="col-xl-4 col-lg-5 col-md-6 col-12 filter_select_box">
                                <FormControl className="filter_select">
                                    <InputLabel id="country_filter" className="filter_label">Country</InputLabel>
                                    <Select
                                        labelId="country_filter"
                                        id="country_filter_helper"
                                        name="country_filter_helper"
                                        className="filter_field"
                                        value={country}
                                        onChange={handleChange}
                                        classes={{ root: classes.selectRoot }}
                                    >
                                        {
                                            FilterData.countries.map((country, ct_id) => {
                                                return <MenuItem value={country.id} key={`country-${ct_id}`}>{country.name}</MenuItem>;
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    {/* NEWS Component */}
                    <News />
                </Country.Provider>
            </Category.Provider>
        </>
    );
}

export default Filter;
export { Category, Country };