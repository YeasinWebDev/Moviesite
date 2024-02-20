import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import MovieCard from "../../components/movieCard/Moviecard";

function SearchResult() {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then(res => {
        setData(res);
        setPageNum(prev => prev + 1)
        setLoading(false);
      })

  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then(res => {
        if (data?.results) {
          setData(prev => ({ ...prev, results: [...prev.results, ...res.results] }))
        } else {
          setData(res)
        }
        setPageNum(prev => prev + 1)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchInitialData()
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data.total_results > 1 ? "results" : "result"
                  } of "${query}"`}
              </div>
              <InfiniteScroll
                  dataLength={data?.results.length}
                  className="content"
                  next={fetchNextPageData}
                  hasMore = {pageNum <= data.total_pages}
                  loader={<Spinner initial={true} />}
              >
                {data?.results.map((item, i) => {
                  if (item.media_type === "person") return
                  return (
                    <MovieCard
                      key={i}
                      data={item}
                      mediaType="movie"
                      fromSearch={true}
                    />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, Result are not available
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult