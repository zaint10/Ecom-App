import axiosPrivate from "../utils/axios";

const HomePage = () => {
  const handle = async () => {
    const response = await axiosPrivate.get("/auth/user");
    console.log(response);
  };
  return (
    <div>
      <div>Home Page</div>
      <button onClick={handle}>Get Items</button>
    </div>
  );
};
export default HomePage;
