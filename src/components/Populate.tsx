"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const Populate = () => {
  const router = useRouter();
  return (
    <button
      className="btn btn-success"
      onClick={() => {
        axios.post("/api/populate/").then(() => {
            router.push("/");
            window.location.replace("/")
        });
      }}
    >
      Populate Database
    </button>
  );
};

export default Populate;
