import React, { useEffect, useState, useCallback } from "react";
import Default from "../../base/Default";
import {getCategories,deleteCategory} from "./helpers/admin_api_calls";
import { Link } from "react-router-dom";
import message from "@davistran86/notification";
import Button from "react-bootstrap/Button";
import CreateCategory from "./partials/CreateCategory";
import UpdateCategory from "./partials/UpdateCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [categoryInfo, setCategoryInfo] = useState({
    id: "", title: "", thumbnail: "", is_service: null
  })

  const handleClose = () => {
    setShowAdd(false);
    setShowUpdate(false);
  }

  const doRefresh = () => setRefresh(!refresh);
  
  const getData = () => {
    getCategories().then((d) => {
      setCategories(d);
      setLoaded(true);
      loaded && categories.length === 0
        ? message.info("No Categories found")
        : message.info("Categories loaded");
    });
  }

  useEffect(() => {
    message.info({ title: "Please wait", description: "Loading categories!" });
    getData();
    handleClose();
  }, [refresh]);

  const handleDeleteCategory = (id, title) => {
    const ans = window.confirm(`Are you sure you want to delete ${title}?`);
    if (ans) {
      deleteCategory(id)
        .then((data) => {
          message.success(`Category '${title}' deleted successfully`);
          getData();
        })
        .catch((err) => {
          message.info(`Deleting '${title}' failed with message: ${err.error}`);
        });
    }
  };

  return (
    <Default pageTitle="Categories">
      <Button variant="warning" onClick={() => { setShowAdd(true) }}>
        Add New
      </Button>
      <br/>
      <br/>
      <CreateCategory showAdd={showAdd} handleClose={handleClose} doRefresh={doRefresh}  modalTitle="Add New Category"/>
      <UpdateCategory showUpdate={showUpdate} handleClose={handleClose} doRefresh={doRefresh} categoryInfo={categoryInfo}/>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing={0}
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                {loaded &&
                  categories.map((c, i) => (
                    <tr key={i}>
                      <td>{c.title}</td>
                      <td><img src={"https://storage.googleapis.com/sarvam_bucket_1/" + c.thumbnail} alt="" width="25" /></td>
                      <td>
                        {c.is_service ? "SERVICE CATEGORY" : "PRODUCT CATEGORY"}
                      </td>
                      <td className="d-flex align-left">
                        {c.is_service && (
                          <Link
                            className="btn btn-info btn-sm btn-circle mr-3"
                            to={`/admindash/categories/${c._id}/subcategories`}
                          >
                            <i className="fas fa-info-circle"></i>
                          </Link>
                        )}
                        <button
                          className="btn btn-primary btn-sm btn-circle mr-3"
                          onClick={() => {
                            setCategoryInfo({...categoryInfo,id: c._id,title: c.title,thumbnail: c.thumbnail,is_service: c.is_service});
                            setShowUpdate(true)
                          }}
                        >
                          <i className="fas fa-pen"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm btn-circle mr-3"
                          onClick={() => {
                            handleDeleteCategory(c._id, c.title);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Default>
  );
};

export default Categories;
