import { Slide, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return (
    <div>
        <ToastContainer
          position="top-right"
        //   autoClose={2000}
        //   hideProgressBar
        //   newestOnTop
        //   closeOnClick
        //   rtl={false}
        //   pauseOnFocusLoss
        //   draggable
        //   pauseOnHover
        //   theme="dark"
        //   transition={Slide}
        />
    </div>
  )
}

export default Notification