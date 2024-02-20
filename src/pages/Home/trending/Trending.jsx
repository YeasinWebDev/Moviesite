import React, { useState } from 'react'
import ContentWraper from "../../../components/contentWrapper/contentWrapper"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'


function Trending() {
    const [endpoint, setEndpoint] = useState("day")
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)
    // console.log(loading); 
    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")
    }
    return (
        <div className='carouselSection'>
            <ContentWraper>
                <div className="container" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                    <div className="carouselTitle">Trending</div>
                    <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
                </div>
            </ContentWraper>

            <Carousel data={data?.results} loading={loading}/>
        </div>
    )
}

export default Trending