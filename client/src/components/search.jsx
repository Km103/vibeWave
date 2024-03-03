import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { searchSong } from "../services/SearchService";
import { Link, useNavigate } from "react-router-dom";
function Search() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        //const searchedSong = await searchSong(data.search);
        data.search = data.search.replace(" ", "%20");
        navigate(`/search/${data.search}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="border-2 text-l border-gray-400  bg-[#292929]  h-10 w-96 px-5 rounded-xl  text-sm focus:outline-none"
                    type="text"
                    placeholder="Search"
                    {...register("search")}
                />
            </form>
        </div>
    );
}

export default Search;
