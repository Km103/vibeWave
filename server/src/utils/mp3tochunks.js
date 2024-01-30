import ffmpeg from "fluent-ffmpeg";

const mp3tochunks = async (inputSong) => {
    const timestamp = Date.now();

    try {
        ffmpeg(inputAudio)
            .outputOptions([
                "-map 0:a",
                "-f dash",
                `-segment_list ${outputMPD}`,
                `-segment_time 10`,
                `-segment_list_size 0`,
            ])
            .output(outputSegments)
            .on("start", () => {
                console.log("Starting DASH transcoding...");
            })

            .run();
    } catch (error) {
        console.log("some error occured");
    }
};

export { mp3tochunks };
