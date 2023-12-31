"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/Loading";
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };

  const handleSignOut = () => {
    signOut("google");
  };
  async function func() {
    if (session) {
      let res = await fetch("api/user/check", {
        method: "POST",
        body: JSON.stringify({ email: session.user.email }),
      });
      let data = await res.json();
      setLoading(false);
      if (data.success) {
        router.push("/planner");
      } else {
        router.push("/signup");
      }
    } else {
      router.push("/login");
    }
    setLoading(false);
  }
  React.useEffect(() => {
    func();
  }, [session]);
  return (
    <>
      {loading && <Loading />}
      <div className="flex bg-black flex-col items-center justify-center min-h-screen">
        {status === "authenticated" ? (
          <button
            onClick={handleSignOut}
            className="bg-blue-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <Loading />
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className=" border-blue-50 border-2  bg-black text-white box font-bold px-10 shadow-md  py-5 rounded-3xl ring-orange-650"
          >
            <div className="flex flex-col items-center">
              <div className="lp">
                <Image
                  className="h-28 w-28 md:h-52 lg:w-52"
                  src="/google.png"
                  width={300}
                  alt="google"
                  height={300}
                />
              </div>
              <div className="cl">Sign in with Google</div>
            </div>
          </button>
        )}

        <div className="dew">
          {session ? <div>{session.user.email}</div> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
