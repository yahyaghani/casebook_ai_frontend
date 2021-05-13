import React, { useEffect, useState } from "react";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  ResultCard,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
import axios from "axios";
import { Fragment } from "react";

function HeaderSearch(props) {
  var url = "https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io";
  // var url = "http://127.0.0.1:5000/api/v1/search";
  return (
    <Fragment>
      <ReactiveBase
        // app="supo-app"
        app="good-books-ds"
        url={url}
        enableAppbase
        appbaseConfig={{
          recordAnalytics: true,
        }}
        type="supo-latest"
      >
        <div className="flex row-reverse app-container">
          <div className="results-container">
            <DataSearch
              // title="DataSearch"
              // dataField={["search", "search.title"]}
              dataField={['original_title', 'original_title.search']}
              // componentId="supo"
              componentId="BookSensor"
              URLParams
              // enableRecentSearches
              enablePopularSuggestions
              size={5}
            />

            <SelectedFilters />
            <ReactiveList
              componentId="SearchResult"
              // dataField="search"
              dataField="original_title"
              size={10}
              className="result-list-container"
              pagination
              react={{
                // and: "supo",
                and: "BookSensor",
              }}
              render={({ data }) => (
                <ReactiveList.ResultCardsWrapper>
                  {data.map((item, index)=>{
                    console.log("data::", item)
                    return(
                      <ResultCard id={item._id} key={item._id}>
                      <ResultCard.Title>{item.original_title}</ResultCard.Title>
                    </ResultCard>
                    )
                  })}
                </ReactiveList.ResultCardsWrapper>
              )}
            />
          </div>
        </div>
      </ReactiveBase>
    </Fragment>
  );
}

export default HeaderSearch;
