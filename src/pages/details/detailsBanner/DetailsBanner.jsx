import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/rating/Rating";
import Img from "../../../components//Loadimage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup" 
import { PlayIcon } from "../Playbtn";

const DetailsBanner = ({ video, crew }) => {

    const [show,setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)


    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const { url } = useSelector(state => state.home)

    const _gener = data?.genres.map(g => g.id)
    // console.log(data);

    const Producer = crew?.filter((f) => f.department === "Production")
    const writer = crew?.filter((f) => f.department === "Writing")
    // console.log(crew);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <div>
                    <div className="backdrop-img">
                        <Img src={url?.backdrop + data?.backdrop_path} />
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data?.poster_path ? (
                                    <Img
                                        className="posterImg"
                                        src={url.backdrop + data?.poster_path}
                                    />
                                ) : (
                                    <Img
                                        className="posterImg"
                                        src={PosterFallback}
                                    />
                                )}
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data?.name || data?.title} (
                                        ${dayjs(data?.release_date).format("YYYY")}
                                    )`}
                                </div>
                                <div className="subtitle">
                                    {data?.tagline}
                                </div>
                                <Genres data={_gener} />
                                <div className="row">
                                    <CircleRating rating={data?.vote_average.toFixed(1)} />
                                    <div className="playbtn"
                                        onClick={() => { 
                                            setShow(true)
                                            setVideoId(video.key)
                                        }}
                                    >
                                        <PlayIcon />
                                        <div className="text">
                                            Watch Trailer
                                        </div>
                                    </div>
                                </div>
                                <div className="overview">
                                    <div className="heading">
                                        Overview
                                    </div>
                                    <div className="description">
                                        {data?.overview}
                                    </div>
                                </div>
                                <div className="info">
                                    {data?.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Status : {""}
                                            </span>
                                            <span className="text">
                                                {data.status}
                                            </span>
                                        </div>
                                    )}

                                    {data?.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Release Date : {" "}
                                            </span>
                                            <span className="text">
                                                {dayjs(data.release_date).format("DD MMM YYYY")}
                                            </span>
                                        </div>
                                    )}

                                    {data?.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Runtime : {" "}
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(data.runtime)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {Producer?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold" >
                                            Producers: {""}
                                        </span>
                                        <span className="text">
                                            {Producer.map((d, i) => (
                                                <span key={i}>
                                                    {d.original_name}
                                                    {Producer.length - 1 !== i && " , "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {writer?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold" >
                                            Writers: {""}
                                        </span>
                                        <span className="text">
                                            {writer.map((d, i) => (
                                                <span key={i}>
                                                    {d.original_name}
                                                    {writer.length - 1 !== i && " , "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {data?.created_by?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold" >
                                        Created by: {""}
                                        </span>
                                        <span className="text">
                                            {data?.created_by.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {data?.created_by.length - 1 !== i && " , "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup 
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                        />
                    </ContentWrapper>
                </div>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
