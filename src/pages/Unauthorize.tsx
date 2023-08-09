import { Link } from "react-router-dom";

const Unauthorize = () => {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "80vh",
      }}
    >
      <p>متاسفیم، شما مجاز به دسترسی به این پنل نیستید</p>
      <Link to="/" style={{ textAlign: "center" }}>
        بازگشت به داشبورد
      </Link>
    </div>
  );
};

export default Unauthorize;
