// components/layout/PublicLayout.js
import { MainNavWrapper } from "../mainNav/navbar";

export const PublicLayout = ({ children, routeName }) => {
  return (
    <div className="public-layout">
      <header>
        <MainNavWrapper routeName={routeName} />
      </header>
      <main
        className="mx-4 md:mx-28"
        style={{
          height: "calc(100vh - 250px)",
        }}
      >
        {children}
      </main>
      <footer>{/* Footer */}</footer>
    </div>
  );
};
