import { useContext, useEffect } from "react";
import CourseCatalogue from "../../components/admin/courses/CourseCatalogue";
import PracticeCatalogue from "../../components/admin/courses/PracticeCatalogue";
import { ServiceManager } from "../../context/ServiceContext";
import Head from "../../layout/head/Head";
import LayoutWithSidebar from "../../layout/template/LayoutWithSidebar";
import "../../styles/comoponents_pages/courseManager.scss";

export default function PracticeManager() {
  const { getAllSubjects, allSubjects } = useContext(ServiceManager);
  useEffect(() => {
    getAllSubjects();
  }, []);
  return (
    <>
      <Head title="Practice Manager" />

      <LayoutWithSidebar pageTitle={"Practice Questions"}>
        <div className="course-manager-container">
          <header>Subjects ({allSubjects?.length})</header>
          <div className="header">
            <div className="search-section">
              <input type="search" placeholder="Search" />
            </div>
          </div>
          <PracticeCatalogue allSubjects={allSubjects} />
        </div>
      </LayoutWithSidebar>
    </>
  );
}
