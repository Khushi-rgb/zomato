import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    const [search, setSearch] = useState("");
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/food`, { withCredentials: true })
            .then(response => {

                console.log(response.data);

               setVideos(response.data.foodItems || []);
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    async function likeVideo(item) {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/like`, { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/save`, { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(search.toLowerCase()) ||
    (video.description || "").toLowerCase().includes(search.toLowerCase())
);

    return (
    <>
        <div style={{ padding: "10px" }}>
           <input
    type="text"
    placeholder="🔍 Search food..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px"
    }}
/>
        </div>

        <ReelFeed
            items={filteredVideos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    </>
)
}

export default Home