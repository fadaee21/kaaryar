import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "80vh",
      }}
    >
      <h3>متاسفیم، صفحه مورد نظر یافت نشد</h3>
      <h1 style={{ textAlign: "center" }}>404</h1>
      <Link to="/" style={{ textAlign: "center" }}>
        بازگشت به داشبورد
      </Link>
    </div>
  );
};

export default NotFound;
