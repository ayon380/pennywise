"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Page = () => {
  const { data: session, status } = useSession();
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();
  const handleMonthlyBudgetChange = (e) => {
    setMonthlyBudget(e.target.value);
  };

  const handleAccountBalanceChange = (e) => {
    setAccountBalance(e.target.value);
  };
  if (status != "authenticated") {
    router.push("/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can do something with the values here, like sending them to a server or performing calculations.
    if (monthlyBudget < 0 || accountBalance < 0) {
      alert("Please enter positive values");
      return;
    }
    let data = {
      monthlyBudget: monthlyBudget,
      accountBalance: accountBalance,
      email: session.user.email,
      image: session.user.image,
      name: session.user.name,
    };
    let res =await  fetch("api/user/add", {
      method: "POST",
      body: JSON.stringify(data),
    });
    let qw = await res.json();
    if (qw.success) {
      router.push("/planner");
    } else {
      alert("Something went wrong");
      signOut("google");
      router.push("/login");
    }
    console.log("Monthly Budget:", monthlyBudget);
    console.log("Account Balance:", accountBalance);
  };

  return (
    <>
      <div className="h1 text-center my-36 text-4xl">
        Hello {session?.user?.name ?? "there"}😊,<br></br>
        Welcome to PennyWise
      </div>
      <div className="flex  items-center justify-center">
        {/* Center the form vertically and horizontally */}
        <div className="p-4 bg-white shadow-md rounded-md w-96">
          {/* Add padding, background, and a fixed width */}
          <h2 className="text-2xl font-bold mb-4">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="monthlyBudget" className="block text-gray-600">
                Monthly Budget:
              </label>
              <input
                type="number"
                id="monthlyBudget"
                value={monthlyBudget}
                onChange={handleMonthlyBudgetChange}
                required
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="accountBalance" className="block text-gray-600">
                Account Balance:
              </label>
              <input
                type="number"
                id="accountBalance"
                value={accountBalance}
                onChange={handleAccountBalanceChange}
                required
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Let's gooo🥳
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
