"use client";

import React from "react";
import { IoSearch } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
function SearchBar() {
    const { register, handleSubmit, reset } = useForm();

    const router = useRouter();
    const onSubmit = (data: any) => {
        router.push(`/search/${data.search}`);
        reset();
    };
    return (
        <div className="flex items-center flex-row border border-input rounded-xl px-4">
            <IoSearch className="text-xl font-bold" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text-border"
                    className="w-80 h-10 px-4 bg-transparent  focus:outline-none text-l"
                    placeholder="Search for Songs, Artists, Albums"
                    {...register("search")}
                />
            </form>
        </div>
    );
}

export default SearchBar;
