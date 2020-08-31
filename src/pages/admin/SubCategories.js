import React, { useEffect, useState } from "react";
import Default from "../../base/Default";
import { getSubCategoriesByParentCategoryId, deleteSubCategory } from "./helpers/admin_api_calls";
import message from "@davistran86/notification";
import Button from "react-bootstrap/Button";
import CreateSubCategory from "./partials/CreateSubCategory";
import UpdateSubCategory from "./partials/UpdateSubCategory";

const SubCategories = (props) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [subCategoryInfo, setSubCategoryInfo] = useState({
    id: "", title: "", thumbnail: "", unit_of_measurment: ""
  })

  const handleClose = () => {
    setShowAdd(false);
    setShowUpdate(false);
  }

  const doRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    getSubCategoriesByParentCategoryId(props.match.params.categoryId).then((d) => {
        setSubCategories(d);
        setLoaded(true);
      });
  }, [props,refresh]);

  const handleDeleteSubCategory = (id, title, pid) => {
    const ans = window.confirm(`Are you sure you want to delete ${title}?`);
    if (ans) {
      deleteSubCategory(id)
        .then((data) => {
          message.success(`Sub Category '${title}' deleted successfully`);
          getSubCategoriesByParentCategoryId(pid);
        })
        .catch((err) => {
          message.info(
            `Deleting '${title}' failed with message: ${err.message}`
          );
        });
      doRefresh()
    }
  };

  return (
    <Default pageTitle="Sub Categories">
      <Button variant="warning" onClick={() => { setShowAdd(true) }} >
        Add New
      </Button>
      <br/>
      <br/>
      <CreateSubCategory showAdd={showAdd} handleClose={handleClose} doRefresh={doRefresh} parentCatId={props.match.params.categoryId} />
      <UpdateSubCategory  showUpdate={showUpdate} handleClose={handleClose} doRefresh={doRefresh} subCategoryInfo={subCategoryInfo}/>
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
                  <th>Unit of measurment</th>
                  <th></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Unit of measurment</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                {loaded &&
                  subCategories.length > 0 &&
                  subCategories.map((c, i) => (
                    <tr key={i}>
                      <td>{c.title}</td>
                      <td><img src={"https://storage.googleapis.com/sarvam_bucket_1/" + c.thumbnail} alt="" width="25" /></td>
                      <td>{c.unit_of_measurment}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm btn-circle ml-3"
                          onClick={() => {
                            setSubCategoryInfo({
                              id: c._id,
                              title: c.title,
                              unit_of_measurment: c.unit_of_measurment
                            });
                            setShowUpdate(true);
                          }}
                        >
                          <i className="fas fa-pen"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm btn-circle ml-3"
                          onClick={() => {
                            handleDeleteSubCategory(
                              c._id,
                              c.title,
                              props.match.params.categoryId
                            );
                            doRefresh();
                            handleClose();
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

export default SubCategories;
