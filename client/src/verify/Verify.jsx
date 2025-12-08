import { useNavigate, useSearchParams } from "react-router-dom"
import Footer from "../components/footer/Footer"
import { useContext, useEffect } from "react"
import { StoreContext } from "../StoreContext.js"
import axios from "axios"

const Verify = () => {
  const [searchParams, SetSearchParam] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const { url } = useContext(StoreContext)
  const navigate = useNavigate()
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/v1/verify", { status: success, orderId })
    if (response.data.status) {
      navigate("/myorders")
    } else {
      navigate("/")
    }
  }
  useEffect(() => {
    verifyPayment();
  }, []);


  return (
    <>
      <div className="mt-40">
        <h1>Verify</h1>
      </div>
      <Footer />
    </>

  )
}

export default Verify
