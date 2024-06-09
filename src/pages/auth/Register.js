import Head from "../../layout/head/Head"
import "../../styles/comoponents_pages/login.scss"
import logo from "../../assets/icons/logo.svg"
import { FcGoogle } from "react-icons/fc"
import { axiosInstance } from "../../services/AxiosInstance"
import { useState } from "react"
import { HandleNotif } from "../../services/NotifHandler"
import { Navigate, useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"

export default function Register() {
  const navigate = useNavigate()
  const [value, setValue] = useState({})
  const [err, setErr] = useState({})
  const [loading, setLoading] = useState(false)

  const userToken = localStorage.getItem("stucademy-tks")

  const handleChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value })

  const validate = () => {
    let errObj = {}
    value["username"]
      ? (errObj = { ...errObj, unameErr: "" })
      : (errObj = { ...errObj, unameErr: "Please enter a unique username" })
    value["name"]
      ? (errObj = { ...errObj, nameErr: "" })
      : (errObj = { ...errObj, nameErr: "Please enter your name" })
    value["email"]
      ? (errObj = { ...errObj, emailErr: "" })
      : (errObj = { ...errObj, emailErr: "Please enter email address" })
    value["phone"]
      ? (errObj = { ...errObj, phoneErr: "" })
      : (errObj = {
          ...errObj,
          phoneErr: "Please enter an active phone number",
        })
    value["password"]
      ? (errObj = { ...errObj, pswErr: "" })
      : (errObj = { ...errObj, pswErr: "Please enter a password" })
    value["password_confirmation"] &&
    value["password_confirmation"] === value["password"]
      ? (errObj = { ...errObj, pswConfirmErr: "" })
      : (errObj = { ...errObj, pswConfirmErr: "passwords do not match" })

    setErr(errObj)

    return Object.values(errObj).every((err) => err === "")
  }

  const handleLogin = async () => {
    try {
      validate() &&
        (await axiosInstance
          .post("register", value)
          .then((resp) => {
            if (resp) {
              HandleNotif({
                text: "Account created successfully!",
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
        text: `There was an issue creating your account, ${error.message}`,
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
              <h2>Create account</h2>
            </header>
            <p>Welcome! Please enter your details</p>
          </center>
        </section>

        <section className="form-section">
          <form action="">
            <div className="input-section">
              <label htmlFor="uname">Username</label>
              <div className="input">
                <input
                  type="text"
                  id="uname"
                  name="username"
                  value={value["username"]}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your username"
                />
              </div>
              <span className="error">
                {err["unameErr"] && err["unameErr"]}
              </span>
            </div>
            <div className="input-section">
              <label htmlFor="name">Name</label>
              <div className="input">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={value["name"]}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your name"
                />
              </div>
              <span className="error">{err["nameErr"] && err["nameErr"]}</span>
            </div>
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
              <label htmlFor="phone">Phone</label>
              <div className="input">
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={value["phone"]}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your phone"
                />
              </div>
              <span className="error">
                {err["phoneErr"] && err["phoneErr"]}
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
            <div className="input-section">
              <label htmlFor="password">Confirm Password</label>
              <div className="input">
                <input
                  type="password"
                  id="confirm password"
                  name="password_confirmation"
                  onChange={(e) => handleChange(e)}
                  placeholder="......"
                />
              </div>
              <span className="error">
                {err["pswConfirmErr"] && err["pswConfirmErr"]}
              </span>
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
                <FcGoogle className="icon" /> Sign up with Google
              </button>
            </div>

            <div className="signup pointer">
              Already have an account? <span className="blue ">Sign In</span>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
