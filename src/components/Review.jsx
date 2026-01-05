import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
const Review = () => {
  const { user } = useUser();
  const [reviewinput, setreviewinput] = useState("");
  const [review, setreview] = useState(() => {
    const stored = localStorage.getItem("review");
    return stored ? JSON.parse(stored) : [];
  });
  const { id: productid } = useParams();
  const handeladdreview = () => {
    if (!reviewinput.trim()) return;

    setreview((prev) => [
      ...prev,
      {
        id: Date.now(),
        productid: productid,
        image: user.imageUrl,
        names: user.fullName,
        text: reviewinput,
      },
    ]);
    setreviewinput("");
  };
  useEffect(() => {
    localStorage.setItem("review", JSON.stringify(review));
  }, [review]);
  return (
    <div className="my-10">
      {user ? (
        <div className="flex justify-around items-center  ">
          <div className="flex flex-col gap-5">
            <h2>Review Customer</h2>
            <input
              type="text"
              value={reviewinput}
              onChange={(e) => setreviewinput(e.target.value)}
              className=" border-gray-400 border rounded-md px-3 py-1 outline-none"
              placeholder="write Your review"
            />
            <button
              disabled={!reviewinput.trim()}
              onClick={handeladdreview}
              className={`self-start  px-4 py-2 rounded-xl bg-linear-to-r from-[#323234f1]  to-[#c7c7cf]  text-white cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed opacity-100   transition-all duration-300`}
            >
              Add you review
            </button>
          </div>
          <div>
            <h4>Reviews All</h4>

            {review
              ?.filter((item) => item.productid === productid)
              .map((item) => (
                <div
                  key={item.id}
                  className="border-gray-300 border-t-2 mt-5  "
                >
                  <div className="flex  justify-center items-center gap-3 mt-5">
                    <img
                      className="size-15 rounded-full"
                      src={item.image}
                      alt=""
                    />
                    <span>{item.names}</span>
                  </div>
                  <p className="mt-4 text-gray-700">{item.text} </p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>loding...</div>
      )}
    </div>
  );
};

export default Review;
