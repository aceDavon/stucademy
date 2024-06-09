import { useState } from "react";
import AddSubject from "../../components/admin/courses/AddSubject";
import CourseCatalogue from "../../components/admin/courses/CourseCatalogue";
import Head from "../../layout/head/Head";
import LayoutWithSidebar from "../../layout/template/LayoutWithSidebar";
import "../../styles/comoponents_pages/courseManager.scss";
import { ServiceManager } from "../../context/ServiceContext";
import { useContext } from "react";
import { useEffect } from "react";

export default function CourseManager() {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const { getAllSubjects } = useContext(ServiceManager);
  useEffect(() => {
    getAllSubjects();
  },[]);
  return (
    <>
      <Head title="Course Manager" />

      <LayoutWithSidebar pageTitle={"Course Manager"}>
        <div className="course-manager-container">
          Subjects
          <div className="header">
            <div className="search-section">
              <input type="search" placeholder="Search" />
            </div>

            <div className="filter-button">
              <div className="select">
                <select name="" id="">
                  <option value="active">Active</option>
                  <option value="active">Inactive</option>
                </select>
              </div>
              <button onClick={() => setShowAddSubject(true)}>
                Add New Subject
              </button>
            </div>
          </div>
          <CourseCatalogue />
        </div>
      </LayoutWithSidebar>

      <div className="modals">
        {/* <AddSubject show={showAddSubject} onHide={()=>setShowAddSubject(false)} /> */}
        <AddSubject
          showState={showAddSubject}
          setShowState={() => setShowAddSubject(false)}
        />
      </div>
    </>
  );
}
