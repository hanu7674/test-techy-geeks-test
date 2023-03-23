import { useRouteError } from "react-router-dom";
import {useLocation} from 'react-router-dom'
export default function ErrorPage() {
    const location = useLocation();
  const error = useRouteError();
  return (
    <div id="error-page" className="container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {
        error ? 
      <p>
        <i>{error.statusText || error.message}</i>
      </p> : <i>
      {location.state.error }
      </i>}
    </div>
  );
}