"use client";

import TabComponent from "@/components/Tab/TabComponent";
import React, { useEffect, useState } from "react";
import AddAdminTab from "./components/AddAdminTab/AddAdminTab";
import ViewAdminsTab from "./components/ViewAdminsTab/ViewAdminsTab";
import axios from "axios";
import Env from "@/Variables/Env";
import TAdminInfo from "@/types/TAdminInfo";
import { IconButton } from "@mui/material";
function Painel() {
  const [admins, setAdmins] = useState<TAdminInfo[]>([]);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    const data = await axios.get(Env.baseUrlSecure + "/root", {
      withCredentials: true,
    });
    setAdmins(data.data);
  };

  const onDelete = async (id: number) => {
    const data = await axios.delete(Env.baseUrlSecure + `/root/${id}`, {
      withCredentials: true,
    });
    console.log(data);
    getAdmins();
  };

  return (
    <div>
      <h1>pagina de root </h1>
      <TabComponent
        tabs={[
          { label: "Add Admin", component: <AddAdminTab /> },
          {
            label: "admins",
            component: (
              <ViewAdminsTab
                admins={admins}
                onDelete={onDelete}
                onUpdateList={getAdmins}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export default Painel;
