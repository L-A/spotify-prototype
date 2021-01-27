const GetOrigin = () => {
  return process.env.VERCEL_URL || window.location.origin;
};

export default GetOrigin;
