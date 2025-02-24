import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import ClientRegisterForm from "./client-register";
import LawyerRegisterForm from "./lawyer-register";

function Register({
  setIsOpen,
  setTab,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Tabs defaultValue="client">
      <TabsList className="grid w-full grid-cols-2 mt-5">
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="lawyer">Lawyer</TabsTrigger>
      </TabsList>
      <TabsContent value="client">
      <ClientRegisterForm setIsOpen={setIsOpen}/>
      </TabsContent>
      <TabsContent value="lawyer">
      <LawyerRegisterForm setIsOpen={setIsOpen} />
      </TabsContent>
      <p className="text-sm text-start mt-2"> 
          Already have an account?{" "}
          <button type="button" className="text-primary underline" onClick={() => setTab("login")}>
            Login here
          </button>
        </p>
    </Tabs>
  );
}

export default Register;
