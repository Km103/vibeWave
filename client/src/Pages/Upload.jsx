import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function Upload() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setSuccess(false);
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("singer", data.singer);
        formData.append("file", data.file[0]);
        console.log(data.file[0]);
        axios
            .post("http://localhost:8000/api/v1/song/upload", formData)
            .then((res) => {
                setLoading(false);
                setSuccess(true);
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("apiError", {
                    type: "manual",
                    message: "An Error Occured while Submitting the form",
                });
                console.log(err);
            });
    };

    return (
        <section className="bg-gray-400 dark:bg-gray-900">
            <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Name of the Song
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 lg:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("name", {
                                required: "Name of the Song is required",
                            })}
                        />
                        {errors.name && (
                            <div className="text-red-600">
                                {errors.name.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="singer"
                            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Name of the Singer
                        </label>
                        <input
                            type="text"
                            id="singer"
                            className="bg-gray-50 border border-gray-300 text-gray-900 lg:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("singer", {
                                required: "Name of the Singer is required",
                            })}
                        />

                        {errors.singer && (
                            <div className="text-red-600">
                                {errors.singer.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="track"
                            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Attach The Song
                        </label>
                        <input
                            type="file"
                            name="file"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register("file", {
                                required: "song track is mandatory",
                            })}
                        />

                        {errors.track && (
                            <div className="text-red-600">
                                {errors.track.message}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Upload
                    </button>
                    {loading && <Loading />}
                    {success && (
                        <div className="text-2xl text-violet-700 text-center rounded-e-sm">
                            Upload successfull!
                        </div>
                    )}
                    {errors.apiError && (
                        <p className="text-2xl text-violet-700 text-center rounded-e-sm">
                            {errors.apiError.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default Upload;
