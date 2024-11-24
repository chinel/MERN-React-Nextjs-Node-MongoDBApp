import { getUserProfile, isAuth } from "../../actions/auth";
import Layout from "../../components/Layout";

const AdminDashboard = (props) => {
  return (
    <Layout isAuthenticated={props.token}>
      <h2>AdminDashboard</h2>
    </Layout>
  );
};

export default AdminDashboard;

export const getServerSideProps = async (context) => {
  const auth = isAuth(context);
  const user = await getUserProfile(context);
  if (!auth || !user) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  if (user.role !== 1) {
    return {
      redirect: {
        destination: "/user",
        permanent: false,
      },
    };
  }

  return {
    props: { token: auth }, // Pass auth data to the page as props
  };
};
