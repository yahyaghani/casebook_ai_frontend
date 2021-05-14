import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Input } from "reactstrap";

function Search(props) {
  return (
    <Fragment>
      <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
        <Input
          type="text"
          className="form-control"
          placeholder="Search products"
        />
      </form>
    </Fragment>
  );
}

export default Search;
