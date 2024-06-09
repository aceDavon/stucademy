import { Helmet, HelmetProvider } from "react-helmet-async";

const Head = ({ ...props }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {props.title ? props.title + " | " : null} Stucademy Admin{" "}
        </title>
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;
