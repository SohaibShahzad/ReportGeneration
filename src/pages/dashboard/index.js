import { getSession, useSession } from "next-auth/react";


export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Welcome to the Dashboard, {session?.user?.name}</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log("context", context.req);
  const session = await getSession({ req: context.req });
  console.log("session", session);
  if (!session) {
    console.log("redirecting");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  console.log("returning props");
  return {
    props: {},
  };
}
