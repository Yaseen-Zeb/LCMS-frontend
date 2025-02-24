import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Dispatch, SetStateAction, useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent
           value="login">
            <Login setIsOpen={setIsOpen} setTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="register">
            <Register setIsOpen={setIsOpen} setTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
