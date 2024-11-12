import HomePage from "src/components/HomePage";
import HomeNavbar from "src/components/HomeNavbar";

export default function Page() {
  return (
    <div className="min-w-screen max-w-screen w-screen scrollbar-hide">
      <HomeNavbar />
      <HomePage />
    </div>
  );
}
