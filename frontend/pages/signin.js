import { useEffect } from "react";
import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { getUserProfile, isAuth } from "../actions/auth";

const Signin = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Sign In</h2>
      <div className="row">
        <div className="col-md-4 offset-md-4 border p-5 mt-4 rounded-2">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const auth = isAuth(context);
  if (auth) {
    const user = await getUserProfile();
    const path = user && user.role === 0 ? "/user" : "/admin";

    return {
      redirect: {
        destination: path,
        permanent: false,
      },
    };
  }

  return {
    props: { token: auth }, // Pass auth data to the page as props
  };
};

export default Signin;
