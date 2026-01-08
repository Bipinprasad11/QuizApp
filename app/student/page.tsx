import HeroSection from "../_components/student-page/HeroSection";
import NavBar from "../_components/student-page/NavBar";

export const metadata={
  title : "Student/Quiz-App"
}

export default function Page() {
  return (
    <>
    <NavBar/>
    <HeroSection/>
    </>
  );
}