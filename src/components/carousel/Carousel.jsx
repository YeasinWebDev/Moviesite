
import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Img from "../Loadimage/Img";
import PosterFallback from "../../assets/no-poster.png";
import Genres from "../genres/Genres";

import "./style.scss";
import CircleRating from "../rating/Rating";
import ContentWrapper from "../contentWrapper/ContentWrapper";

function Carousel({ data, loading, endpoint, title }) {
    const carouselContainer = useRef()
    const { url } = useSelector(state => state.home);
    // console.log(data);
    const navigate = useNavigate();

    const navigation = (driection) => {
        const container = carouselContainer.current

        const scrollAmount =
            driection === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title &&
                    <div className="carouselTitle">
                        {title}
                    </div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {
                            data?.map((item => {
                                const posteUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                        className="carouselItem">
                                        <div className="posterBlock">
                                            <Img src={posteUrl} />
                                            <CircleRating rating={item?.vote_average?.toFixed(1)} />
                                            <Genres data={item.genre_ids.slice(0, 2)} />
                                        </div>
                                        <div className="textBlock">

                                            <div className="title">
                                                {item.title || item.name}
                                            </div>
                                            <div className="date">
                                                {dayjs(item.release_date).format("DD MMM YYYY")}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel