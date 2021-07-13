import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const RequireAuthHooks = (props) => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  console.log("made it");

  useEffect(() => {
    if (!auth) {
      history.push("/");
    }
  }, [auth]);

  return props.children;
};

const RequireAuthHooksWrapper = (ChildComponent) => {
  console.log("first part");
  return (
    <RequireAuthHooks>
      <ChildComponent />
    </RequireAuthHooks>
  );
};

export default RequireAuthHooksWrapper;
