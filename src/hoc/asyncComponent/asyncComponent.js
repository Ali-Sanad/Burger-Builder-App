// import React from "react";
// import { useEffect, useState } from "react";

// //lazy loading
// const asyncComponent = (importComponent) => {
//   return (props) => {
//     const [component, setComponent] = useState(null);

//     useEffect(() => {
//       importComponent().then((cmp) => setComponent(cmp.default));
//     }, []);

//     const C = component;

//     return C ? <C {...props} /> : null;
//   };
// };

// export default asyncComponent;
