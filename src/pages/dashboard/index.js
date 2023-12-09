import { getSession, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="p-4">
      <span className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Dashboard, {session?.user?.firstName}{" "}
          {session?.user?.lastName}
        </h1>
      </span>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
