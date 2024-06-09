import { useState } from "react"
import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import AddIcon from "./AddNewIcon"
import { IconsTable } from "./IconsTable"
import "../../../styles/comoponents_pages/iconsManager.scss"

export function IconManager() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Head title="Icons" />
      <LayoutWithSidebar pageTitle="Icons Manager">
        <div className="course-manager-container">
          Icons
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
              <button onClick={() => setShowModal(!showModal)}>
                Add New Icon
              </button>
            </div>
          </div>
        </div>
        <IconsTable />
        <AddIcon setShowState={setShowModal} showState={showModal} />
      </LayoutWithSidebar>
    </>
  )
}
