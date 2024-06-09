import { BiSortAlt2 } from "react-icons/bi";
import Head from "../../../layout/head/Head";
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar";
import { useEffect, useState } from "react";
import EmptySubjectCatalogue from "../../../components/empty_states/EmptySubjectCatalogue";
import { IoIosMore } from "react-icons/io";
import "../../../styles/comoponents_pages/queriesManager.scss";
import QueryDetails from "./QueryDetails";
import { axiosInstance } from "../../../services/AxiosInstance";
import { handleFilter } from "../../../utils/searchFilter";

export default function QueriesTable() {
  const [editCourse, setEditCourse] = useState({
    toggle: false,
    toEdit: "",
  });

  const [queries, setQueries] = useState([]);
  const [queriesUnaltered, setQueriesUnaltered] = useState([]);

  const [showQueryDetails, setShowQueryDetails] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(false);

  function handleToggleEdit(courseId) {
    setEditCourse({
      ...editCourse,
      toggle: !editCourse.toggle,
      toEdit: editCourse.toEdit ? "" : courseId,
    });
  }

  async function getReports() {
    try {
      await axiosInstance.get(`/reports`).then((resp) => {
        const { queries } = resp.data;
        setQueries(queries?.data);
        setQueriesUnaltered(queries?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <Head title="All queries | Queries Manager" />

      <LayoutWithSidebar pageTitle={"Queries"}>
        <div
          className="course-manager-container all-queries-container"
          onClick={() => setEditCourse({ ...editCourse, toEdit: "" })}
        >
          <b>All Queries ({queries?.length})</b>
          <div className="header">
            <div className="search-section">
              <input
                type="search"
                placeholder="Search"
                onChange={(e) =>
                  setQueries(handleFilter(queriesUnaltered, e.target.value))
                }
              />
            </div>

            <div className="filter-button">
              <div className="select">
                <select name="" id="">
                  <option value="">Filter:All</option>
                </select>
              </div>
            </div>
          </div>

          {queries.length ? (
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <td>
                      I.D <BiSortAlt2 className="icon" />
                    </td>
                    <td>
                      NAME <BiSortAlt2 className="icon" />
                    </td>
                    <td>
                      REPORT TYPE <BiSortAlt2 className="icon" />
                    </td>
                    <td>
                      CATEGORY <BiSortAlt2 className="icon" />
                    </td>
                    <td>
                      DATE <BiSortAlt2 className="icon" />
                    </td>
                    <td>
                      STATUS <BiSortAlt2 className="icon" />
                    </td>
                    <td>
                      ACTION <BiSortAlt2 className="icon" />
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {queries?.length
                    ? queries.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td> {item.id} </td>
                            <td>{item?.user?.name}</td>
                            <td> {item.report_type}</td>
                            <td className=""> {item.report_category} </td>
                            <td className="">
                              {" "}
                              {new Date(
                                item.created_at
                              ).toLocaleDateString()}{" "}
                            </td>
                            <td className="status-column">
                              {!item.admin_response ? (
                                <span className="active-subject">Active</span>
                              ) : (
                                <span className="active-resolved">
                                  Resolved
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              <span className="options">
                                <IoIosMore
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleEdit(item.id);
                                  }}
                                />
                                {editCourse.toEdit === item.id && (
                                  <div
                                    className="options-menu"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <div
                                      className="item"
                                      onClick={() => {
                                        setShowQueryDetails(true);
                                        setSelectedQuery(item);
                                        setEditCourse({
                                          ...editCourse,
                                          toEdit: "",
                                        });
                                      }}
                                    >
                                      View details
                                    </div>{" "}

                                  </div>
                                )}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptySubjectCatalogue />
          )}
        </div>
      </LayoutWithSidebar>

      <div className="modal">
        <QueryDetails
          showState={showQueryDetails}
          setShowState={() => {
            setShowQueryDetails(false);
          }}
          queryData={selectedQuery}
          reloadQueriesFunc={getReports}
        />
      </div>
    </>
  );
}
