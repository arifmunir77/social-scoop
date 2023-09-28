import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";

function AuthPage(props) {
  return (
    <div>
      <div className="row d-flex justify-content-center">
        <div className="signUpForm">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
