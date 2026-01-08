import HeroSection from "../_components/teacher-page/HeroSection";
import NavBar from "../_components/teacher-page/NavBar";


export const metadata={
  title : "Teacher/Quiz-App"
}

export default function Page() {
  return (
    <>
    <NavBar/>
    <HeroSection/>
    </>
  );
}