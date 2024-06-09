import { useState } from "react"
import Navigation from "../../components/admin/Navigation"
import Sidebar from "../../components/admin/Sidebar"
import NotificationSummaryMOdal from "../../components/admin/notifications/NotificationSummaryModal"

export default function LayoutWithSidebar({ children, pageTitle }) {
  const [showNotifications, setShowNotifications] = useState(true)
  return (
    <>
      <Navigation
        pageTitle={pageTitle}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />
      <Sidebar />

      <div
        className="template-with-sidebar-body"
        onClick={() => setShowNotifications(false)}
      >
        {children}
      </div>
      <div className="modals-section">
        {showNotifications ? <NotificationSummaryMOdal /> : null}
      </div>
    </>
  )
}
