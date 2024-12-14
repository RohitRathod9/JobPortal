/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Hero from "../components/Hero";
import TopNiches from "../components/TopNiches";
import HowItWorks from "../components/HowItWorks";
import { getUser } from "../store/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isAuthenticated) {
          await dispatch(getUser()).unwrap();
        }
      } catch (err) {
        if (!err.includes('Please login first')) {
          toast.error(err || 'Server error');
        }
      }
    };

    fetchUser();
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Hero />
      <TopNiches />
      <HowItWorks />
    </>
  );
};

export default Home;