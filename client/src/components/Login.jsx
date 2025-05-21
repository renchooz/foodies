import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { setshowUserLogin, setUser, setCardItems, nevigate } = useAppContext();

  const [state, setState] = useState("login"); // "login" | "register" | "forget" | "verify" | "reset"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `https://foodies-backend-mu0d.onrender.com/api/user/${state}`,
        { name, email, phone, password, otp, newPassword },
        { withCredentials: true }
      );

      // Handle forget password OTP sending
      if (data.forgetstatus) {
        toast.success(data.otp);
        setState("verify");
        return;
      }

      // Handle OTP verification
      if (data.otpStatus) {
        toast.success(data.otpMessage);
        setState("reset");
        return;
      }

      // Handle password reset
      if (data.resetSuccess) {
        toast.success("Password reset successful");
        setState("login");
        return;
      }

      // Handle login/register
      if (data.status) {
        toast.success(data.message);
        nevigate("/");
        setshowUserLogin(false);
        setUser(data.user);
        setCardItems(data.user.cartItems);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setshowUserLogin(false)}
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-30 bg-black/50 h-full"
    >
      <form
        onSubmit={SubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-10 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto text-[#E9AB54] capitalize">
          {state}
        </p>

        {state === "register" && (
          <>
            <div className="w-full">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter name"
                className="border border-gray-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
                type="text"
                required
              />
            </div>

            <div className="w-full">
              <p>Phone</p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Enter phone number"
                className="border border-gray-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
                type="text"
                required
              />
            </div>
          </>
        )}

        {(state === "login" || state === "register") && (
          <>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email"
                className="border border-gray-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
                type="email"
                required
              />
            </div>

            <div className="w-full">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter password"
                className="border border-gray-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
                type="password"
                required
              />
            </div>
          </>
        )}

        {state === "forget" && (
          <div className="w-full">
            <p>Phone Number</p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Enter phone"
              className="border border-gray-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
              type="text"
              required
            />
            <button
              type="submit"
              className="bg-[#E9AB54] mt-6 hover:bg-[#926526] text-white w-full py-2 rounded-md"
            >
              Send OTP
            </button>
          </div>
        )}

        {state === "verify" && (
          <>
            <div className="w-full">
              <p>Enter 4-digit OTP</p>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                maxLength={4}
                placeholder="____"
                className="tracking-widest text-center text-xl border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
                type="text"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md"
            >
              Verify OTP
            </button>
          </>
        )}

        {state === "reset" && (
          <>
            <div className="w-full">
              <p>New Password</p>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                placeholder="Enter new password"
                className="border border-gray-200 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
                type="password"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#E9AB54] hover:bg-[#926526] text-white w-full py-2 rounded-md"
            >
              Reset Password
            </button>
          </>
        )}

        {(state === "login" || state === "register") && (
          <button
            type="submit"
            className="bg-[#E9AB54] hover:bg-[#926526] transition-all text-white w-full py-2 rounded-md cursor-pointer"
          >
            {state === "register" ? "Create Account" : "Login"}
          </button>
        )}

        <div className="text-sm text-gray-700 mt-2 w-full text-center">
          {state === "login" && (
            <>
              Don't have an account?{" "}
              <span
                className="text-[#E9AB54] cursor-pointer"
                onClick={() => setState("register")}
              >
                Register
              </span>{" "}
              |{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => setState("forget")}
              >
                Forgot Password?
              </span>
            </>
          )}
          {state === "register" && (
            <>
              Already have an account?{" "}
              <span
                className="text-[#E9AB54] cursor-pointer"
                onClick={() => setState("login")}
              >
                Login
              </span>
            </>
          )}
          {(state === "forget" || state === "verify" || state === "reset") && (
            <>
              Go back to{" "}
              <span
                className="text-[#E9AB54] cursor-pointer"
                onClick={() => setState("login")}
              >
                Login
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
