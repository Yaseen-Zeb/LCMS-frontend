import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Dispatch, SetStateAction, useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthDialog = ({
  isAuthDialogOpen,
  setIsAuthDialogOpen,
}: {
  isAuthDialogOpen: boolean;
  setIsAuthDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="login">
            <Login
              setIsAuthDialogOpen={setIsAuthDialogOpen}
              setTab={setActiveTab}
            />
          </TabsContent>
          <TabsContent value="register">
            <Register
              setIsAuthDialogOpen={setIsAuthDialogOpen}
              setTab={setActiveTab}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
