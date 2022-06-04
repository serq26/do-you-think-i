import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {navigate('/login')},3000);
  }, []);

  return (
    <>
      <div>Verification Success</div>
      <br />
      <p>You are redirecting to login page... Wait please</p>
    </>
  );
}
