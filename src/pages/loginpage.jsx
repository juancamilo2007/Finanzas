import LoginForm from "../components/loginForm";

const LoginPage = () => {
  console.log("El componente LoginPage se está renderizando");

  return (
    <div className="login-page">
      <LoginForm onLogin={() => console.log("Login exitoso")} />
    </div>
  );
};

export default LoginPage;

