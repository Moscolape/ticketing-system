import { ReactNode, useEffect, useState } from "react";
import Navbar from "./navbar";


type DashboardWrapperProps = {
  children: ReactNode;
};

// ErrorBoundaryComponent catches errors that occur within its children
const ErrorBoundaryComponent: React.FC<DashboardWrapperProps> = ({
  children,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Error handler function
    const handleError = () => {
      setHasError(true);
    };

    // Attach error event listener to window
    window.addEventListener("error", handleError);

    // Clean up event listener
    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  // Render error message if an error occurred
  if (hasError) {
    return <div>Oops! Something went wrong.</div>;
  }

  // Render children if no error occurred
  return <>{children}</>;
};

// MainWrapper component wraps the application with a sidebar, navbar, and error boundary
const Wrapper: React.FC<DashboardWrapperProps> = ({ children }) => {

  return (
    <ErrorBoundaryComponent>
      <div className="w-full h-full">
        <Navbar />
        <div
          className="w-full mt-24"
        >
          {children}
        </div>
      </div>
    </ErrorBoundaryComponent>
  );
};

export default Wrapper;