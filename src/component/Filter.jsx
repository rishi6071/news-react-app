import React, { useState } from 'react';
import './Filter.css';
import FilterData from './FilterData';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    const [category, setCategory] = useState('All');
    const [country, setCountry] = useState('All');
    const [language, setLanguage] = useState('All');

    // On Changing Any Filter
    const handleChange = (event) => {
        const [name, value] = [event.target.name, event.target.value];
        if (name === 'category_filter_helper')
            setCategory(value);
        else if (name === 'country_filter_helper')
            setCountry(value);
        else if (name === 'language_filter_helper')
            setLanguage(value);
    }

    const classes = useStyles();

    return (
        <>
            <div className="container-lg mt-md-3 mt-2">
                <div className="row">
                    {/* Category Select */}
                    <div className="col-lg-4 col-md-6 col-12 filter_select_box">
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
                                <MenuItem value={'All'}>All Categories</MenuItem>
                                {
                                    FilterData.categories.map((category) => {
                                        return <MenuItem value={category}>{category}</MenuItem>;
                                    })
                                }
                            </Select>
                            {/* <FormHelperText>Select News Category</FormHelperText> */}
                        </FormControl>
                    </div>

                    {/* Country Select */}
                    <div className="col-lg-4 col-md-6 col-12 filter_select_box">
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
                                <MenuItem value={'All'}>All Countries</MenuItem>
                                {
                                    FilterData.countries.map((country) => {
                                        return <MenuItem value={country.id}>{country.name}</MenuItem>;
                                    })
                                }
                            </Select>
                            {/* <FormHelperText>Select the Country</FormHelperText> */}
                        </FormControl>
                    </div>

                    {/* Language Select */}
                    <div className="col-lg-4 col-md-6 col-12 filter_select_box">
                        <FormControl className="filter_select">
                            <InputLabel id="language_filter" className="filter_label">Language</InputLabel>
                            <Select
                                labelId="language_filter"
                                id="language_filter_helper"
                                name="language_filter_helper"
                                className="filter_field"
                                value={language}
                                onChange={handleChange}
                                classes={{ root: classes.selectRoot }}
                            >
                                <MenuItem value={'All'}>All Languages</MenuItem>
                                {
                                    FilterData.languages.map((language) => {
                                        return <MenuItem value={language.id}>{language.name}</MenuItem>;
                                    })
                                }
                            </Select>
                            {/* <FormHelperText>Select Language</FormHelperText> */}
                        </FormControl>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;