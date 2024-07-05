import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl={"/new-user"}
      />
    </div>
  );
};

export default SignUpPage;
