import TAdminInfo from "@/types/TAdminInfo";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
interface Props {
  admins: TAdminInfo[];
  onUpdateList: () => void;
  onDelete: (id: number) => void;
}

function ViewAdminsTab(prop: Props) {
  return (
    <Box width={"50%"}>
      <IconButton
        onClick={() => {
          prop.onUpdateList();
        }}
      >
        <UpdateIcon />
      </IconButton>
      {prop.admins.map((admin, index) => (
        <Card key={`adminCard-${admin.id}`}>
          <CardContent>
            <Typography>{admin.name}</Typography>
            <IconButton
              onClick={() => {
                prop.onDelete(admin.id);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ViewAdminsTab;
