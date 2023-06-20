// Base
import { useRouter } from "next/router";
import Router from "next/router";

// Project
import withAuth from "../components/WithAuth";

const Index = () => {
  // const router = useRouter();
  // const { message } = router.query;

  return <div></div>;
};

export default withAuth(Index);
