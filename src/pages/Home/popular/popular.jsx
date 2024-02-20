import React, { useState } from 'react'
import ContentWraper from "../../../components/contentWrapper/contentWrapper"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'


function Popular() {
    const [endpoint, setEndpoint] = useState("movie")
    const { data, loading } = useFetch(`/${endpoint}/popular`)
    // console.log(data); 
    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }
    return (
        <div className='carouselSection'>
            <ContentWraper>
                <div className="container" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                    <div className="carouselTitle">What's Popular</div>
                    <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
                </div>
            </ContentWraper>

            <Carousel
            endpoint={endpoint}
             data={data?.results} 
             loading={loading}/>
        </div>
    )
}

export default Popular