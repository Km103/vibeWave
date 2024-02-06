import { AlbumArtwork } from "@/components/AlbumArtwork";
import Sidebar from "@/components/Sidebar";
import { ScrollBar } from "@/components/ui/scroll-area";
import { listenNowAlbums, madeForYouAlbums } from "@/data/albums";
import { playlists } from "@/data/playlists";
import { Separator } from "@radix-ui/react-menubar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function Home() {
    return (
        <>
            <div className=" bg-black h-full min-h-100">
                <div className="border-t border-gray-600 bg-black">
                    <div className="bg-black text-white">
                        <div className="grid lg:grid-cols-6 bg-black">
                            <Sidebar
                                playlists={playlists}
                                className="hidden lg:block "
                            />
                            <div className="col-span-3 lg:col-span-4 lg:border-l border-gray-600">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h2 className="text-2xl font-semibold tracking-tight">
                                                Listen Now
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Top picks for you. Updated
                                                daily.
                                            </p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="relative">
                                        <ScrollArea>
                                            <div className="flex space-x-4 pb-4">
                                                {listenNowAlbums.map(
                                                    (album) => (
                                                        <AlbumArtwork
                                                            key={album.name}
                                                            album={album}
                                                            className="w-[250px] px-1"
                                                            aspectRatio="portrait"
                                                            width={250}
                                                            height={330}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </div>
                                    <div className="mt-6 space-y-1">
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            Made for You
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Your personal playlists. Updated
                                            daily.
                                        </p>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="relative">
                                        <ScrollArea>
                                            <div className="flex space-x-4 pb-4">
                                                {madeForYouAlbums.map(
                                                    (album) => (
                                                        <AlbumArtwork
                                                            key={album.name}
                                                            album={album}
                                                            className="w-[150px]"
                                                            aspectRatio="square"
                                                            width={150}
                                                            height={150}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
