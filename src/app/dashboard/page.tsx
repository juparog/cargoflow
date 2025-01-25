import { NextPage } from "next";

// interface Props {}
type Props = object;

const DashboardPage: NextPage<Props> = ({}) => {
  return <div>dashboard page {process.env.NEXT_PUBLIC_URL}</div>;
};

export default DashboardPage;
