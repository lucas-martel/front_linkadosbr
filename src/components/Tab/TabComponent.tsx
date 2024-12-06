"use client";

import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

interface TabItem {
  label: string;
  component: React.ReactNode;
}

interface TabComponentProps {
  tabs: TabItem[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="tab component"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              "&.Mui-selected": {
                color: "primary.contrastText", // cor do texto quando selecionado
              },
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>{tabs[selectedTab]?.component}</Box>
    </Box>
  );
};

export default TabComponent;
