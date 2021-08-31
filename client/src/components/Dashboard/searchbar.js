import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";
import { connect } from 'react-redux';


const searchBar = { display: 'flex', alignItems: 'center', marginRight: '4rem', }
const searchResults = { backgroundColor: 'white', width: '510px', height: '5rem', overflow: 'hidden', overflowY: 'auto', zIndex: 10 }
const title = { cursor: 'pointer', }
const warp = { display: 'inline-block', zIndex: 3, }
const text = { width: '500px', padding: '5px' }
function SearchBar(props) {
    console.log(props.video)

    const [search, setSearch] = useState([]);
    const [titleEntered, setTitleEntered] = useState("");

    const handleSearch = (e) => {
        const searchIn = e.target.value;
        setTitleEntered(searchIn);
        const newSearch = props.video.videos.filter((value) => {
            return value.title.toLowerCase().includes(searchIn.toLowerCase());
        });
        setSearch(newSearch);
        if (searchIn === "") {
            setSearch([]);
        } else {
            setSearch(newSearch);
        }
    }
    const handleClick = (video_id, title, description, _id) => {
        props.history.push(`/video/play`, { video_id: video_id, title: title, description: description, object: _id });
    }

    const clearSearch = () => {
        setSearch([]);
        setTitleEntered("");
    }
    return (
        <React.Fragment>
            <div style={warp}>
                <div style={searchBar}>
                    <TextField style={text} size="small" type='text' value={titleEntered} onChange={handleSearch} placeholder=' Search' />
                    <IconButton type="submit" aria-label="search">
                        {search.length === 0 ? <SearchIcon /> : <CloseIcon onClick={clearSearch} />}
                    </IconButton>
                </div>
                {search.length != 0 && (
                    <div style={searchResults}>
                        {search.slice(0, 8).map((item, index) => {
                            return (
                                <div style={title} key={index} onClick={handleClick}>
                                    <p>{item.title}</p>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({ video: state.video, })
export default connect(mapStateToProps)(SearchBar)