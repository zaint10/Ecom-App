import { authUserStore } from "@store/auth";

const HomePage = () => {
  const authUser = authUserStore((state) => state.authUser);
  return (
    <div>
      <div>Home Page</div>
      {JSON.stringify(authUser)}
    </div>
  );
};
export default HomePage;
