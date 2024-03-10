import React, { useEffect } from "react";
import { useParams } from "next/navigation";

function Page() {
    const { id } = useParams();

    useEffect(() => {
        // use client
    }, []);

    return <div></div>;
}

export default Page;
