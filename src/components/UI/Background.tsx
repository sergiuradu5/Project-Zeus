const Background = () => {
  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-r from-myBlue to-myPink"></div>
      <div className="-z-10 h-full top-0 w-full absolute bg-pattern opacity-15" />
    </>
  );
};
export default Background;
