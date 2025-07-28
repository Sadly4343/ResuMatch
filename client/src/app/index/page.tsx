import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Welcome to the site</h1>
      {status === "loading" && <p>Loading session...</p>}
      {session ? (
        <p>Signed in as {session.user?.email}</p>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}