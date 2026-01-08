import HeroSection from "../_components/admin-page/HeroSection";
import NavBar from "../_components/admin-page/Navbar";

export const metadata={
  title : "Admin/Quiz-App"
}

export default function Page() {
  return (
    <>
    <NavBar/>
    <HeroSection/>
    </>
  );
}