"use client";
import React, { use, useEffect, useState } from "react";
import { searchAllData } from "@/services/search";
import { usePlayerSelector, usePlayerDispatch } from "@/redux/store";
import Songs from "@/components/search/songs";
import Artists from "@/components/search/Artists";
import Albums from "@/components/search/Albums";
import { Search } from "lucide-react";

interface Search {
    songs: any;
    albums: any;
    artists: any;
}

function Page({ params }: { params: { slug: string } }) {
    const [searchData, setSearchData] = useState<Search>({} as Search);
    const dispatch = usePlayerDispatch();
    useEffect(() => {
        searchAllData(params.slug, 1).then((data) => {
            setSearchData(data);
        });
    }, [params.slug]);

    if (searchData) {
        const songs = searchData?.songs?.docs;
        const albums = searchData?.albums?.docs;
        const artists = searchData?.artists?.docs;
        return (
            <div className="ml-[14%] px-6 py-4 gap-y-8 flex flex-col mb-20 ">
                {songs?.length > 0 && <Songs songs={songs} />}
                {albums?.length > 0 && <Albums albums={albums} />}
                {artists?.length > 0 && <Artists artists={artists} />}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default Page;
