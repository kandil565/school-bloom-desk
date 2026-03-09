const Footer = () => {
  return (
    <div
      className="w-full text-center py-2 text-xs sm:text-sm font-medium"
      style={{
        background: "linear-gradient(90deg, #0ea5e9, #06b6d4, #14b8a6)",
        color: "#fff",
        letterSpacing: "0.04em",
        direction: "rtl",
      }}
    >
      ✨ تم التطوير بواسطة&nbsp;<span style={{ fontWeight: 700 }}>فارس شريف</span>
    </div>
  );
};

export default Footer;
