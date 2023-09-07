export const dynamic = "force-dynamic";
"use client";
// import type { Metadata } from 'next';
import React from "react";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";
import { signOut, useSession } from "next-auth/react";
import { AiOutlinePlus } from "react-icons/ai";
import TransactionForm from "../../components/TransactionForm";

const Page = () => {

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const func = async () => {
    try {
      const res = await fetch("api/transaction/get", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data.success);
      console.log(data.data);
      setData(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const formattime = (timestamp) => {
    const date = new Date(timestamp);

    // Create an options object for formatting
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    // Format the date and time in IST
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  const { data: session, status } = useSession();
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const handleFloatingButtonClick = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  React.useEffect(() => {
    func();
  }, [isFormOpen]);
  return (
    <div className="bg-black pt-16 md:pt-32 text-white pb-96 h-full">
    
      {loading && <Loading />}
      {
        // if user is not logged in
        session && status === "unauthenticated" && router.push("/auth/signin")
      }
      {session && data && status === "authenticated" && (
        <div>
          <h1 className="py-10 md:py-32 text-4xl md:text-8xl text-center">
            PennyWise
          </h1>
          <div className="lp ">
            <div className="flex text-lg md:text-2xl flex-wrap  justify-between mx-24 md:mx-48">
              <div className="q1">
                Month Budget : &#8377;{data.monthlyBudget}
              </div>
              <div className="q2">
                Remaining Budget : &#8377;{data.remainingBudget}
              </div>
              <div className="q3">
                Account Balance : &#8377;{data.accountBalance}
              </div>
              <div className="q4">
                Total Transactions : &#8377;{data.totalTransactions}
              </div>
            </div>
          </div>
          <div className="h2  text-center text-2xl md:text-5xl my-20 ">
            Transactions
          </div>
          <div className="tr text-xs border-2 border-orange-600 rounded-xl mx-5 md:mx-48 p-2 md:p-20">
            <div className="flex  justify-between md:text-2xl">
              <div className="q1 text-center w-1/5">Category</div>
              <div className="q2 text-center w-1/5">Description</div>
              <div className="q3 text-center w-1/5">Amount</div>
              <div className="q4 text-center w-1/5">Type</div>
              <div className="q5 text-center w-1/5">Date</div>
            </div>
            <div className="bl md:mt-5 h-1 bg-black  rounded-lg"></div>
            {data.transactions &&
              data.transactions.map((transaction) => (
                <div key={transaction.date}>
                  <div className="flex  justify-between md:text-2xl">
                    <div className="q1 text-center w-1/5">
                      {transaction.category}
                    </div>
                    <div className="q2 text-center w-1/5">
                      {transaction.description}
                    </div>
                    <div className="q3 text-center w-1/5">
                      {transaction.amount}
                    </div>
                    <div className="q4 text-center w-1/5">
                      {transaction.type}
                    </div>
                    <div className="q5 text-center w-1/5">
                      {formattime(transaction.date)}
                    </div>
                  </div>
                  <div className="bl md:mt-5 h-1 bg-gray-200  rounded-lg"></div>
                </div>
              ))}
          </div>
          <button
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white text-2xl md:text-4xl p-4 rounded-full"
            onClick={handleFloatingButtonClick}
          >
            <AiOutlinePlus />
          </button>
          <TransactionForm isOpen={isFormOpen} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default Page;
