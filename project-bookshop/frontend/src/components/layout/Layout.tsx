import Footer from "../common/Footer";
import Header from "../common/Header";
import { Button } from "../common/Button";
import { useTheme } from "@/context/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isDark, toggle } = useTheme();

  return (
    <div>
      <Header />
      <main>{children}</main>
      <div style={{ padding: "2rem" }}>
        <h1>Stitches Theme + Variants</h1>
        <Button color="primary">Primary</Button>
        <Button color="secondary" style={{ marginLeft: "1rem" }}>
          Secondary
        </Button>
        <div style={{ marginTop: "2rem" }}>
          <Button onClick={toggle}>
            Switch to {isDark ? "Light" : "Dark"} Mode
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
