import Head from "../../layout/head/Head"
import "../../styles/comoponents_pages/login.scss"
import logo from "../../assets/icons/logo.svg"
import { FcGoogle } from "react-icons/fc"
import { axiosInstance } from "../../services/AxiosInstance"
import { useState } from "react"
import { HandleNotif } from "../../services/NotifHandler"
import { Navigate, useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"

export default function Login() {
  const navigate = useNavigate()
  const [value, setValue] = useState({})
  const [err, setErr] = useState({})
  const [loading, setLoading] = useState(false)

  const userToken = localStorage.getItem("stucademy-tks")

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value })

  const validate = () => {
    let errObj = {}
    value["email"]
      ? (errObj = { ...errObj, emailErr: "" })
      : (errObj = { ...errObj, emailErr: "Please enter email address" })
    value["password"]
      ? (errObj = { ...errObj, pswErr: "" })
      : (errObj = { ...errObj, pswErr: "Please enter a password" })

    setErr(errObj)

    return Object.values(errObj).every((err) => err === "")
  }

  const handleLogin = async () => {
    try {
      validate() &&
        (await axiosInstance
          .post("admin/login", value)
          .then((resp) => {
            if (resp) {
              HandleNotif({
                text: "Logged In successfully!",
                type: "success",
              })
              localStorage.setItem("stucademy-tks", resp.data.token)
              navigate("/", { replace: true })
            }
          })
          .catch((err) => {
            throw new Error(err)
          }))
    } catch (error) {
      HandleNotif({
        text: `There was an issue Logging you in, ${error.message}`,
        type: "error",
      })
    }
  }

  if (userToken) return <Navigate to={"/"} />

  return (
    <>
      <Head title="Authentication" />
      <div className="login-container">
        <center>
          <div className="logo-section">
            <img src={logo} alt="Stucademy" />
          </div>
        </center>

        <section className="header-section">
          <center>
            <header>
              <h2>Log in to your account</h2>
            </header>
            <p>Welcome back! Please enter your details</p>
          </center>
        </section>

        <section className="form-section">
          <form action="">
            <div className="input-section">
              <label htmlFor="email">Email</label>
              <div className="input">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={value["email"]}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your email"
                />
              </div>
              <span className="error">
                {err["emailErr"] && err["emailErr"]}
              </span>
            </div>

            <div className="input-section">
              <label htmlFor="password">Password</label>
              <div className="input">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  placeholder="......"
                />
              </div>
              <span className="error">{err["pswErr"] && err["pswErr"]}</span>
            </div>

            <div className="recovery-section">
              <div className="checkbox-area">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember for 30 days</label>
              </div>

              <div className="forgot-section">Forgot password</div>
            </div>

            <div className="button-section">
              <button
                type="button"
                className="continue"
                onClick={() => {
                  setLoading(true)
                  handleLogin()
                }}
              >
                {loading ? <Spinner size="sm" variant="black" /> : "Continue"}
              </button>
              <button className="withGoogle">
                {" "}
                <FcGoogle className="icon" /> Sign in with Google
              </button>
            </div>

            <div className="signup pointer">
              Don't have an account? <span className="blue ">Sign Up</span>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
