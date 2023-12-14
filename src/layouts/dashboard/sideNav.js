import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Nav_Setting } from "../../data";
import AntSwitch from "../../components/AntSwitch";
import useSettings from "../../hooks/useSettings";
import { faker } from "@faker-js/faker";
const DashboardLayout = () => {

  const theme = useTheme();
  const { onToggleMode } = useSettings();
  const [selected, setSelected] = useState(0);
  return (
      <Box sx={{ backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px", height: "100vh", width: 100 }}>
        <Stack p={2} justifyContent="space-between" direction="column" spacing={2} alignItems={"center"} sx={{ height: "100%" }} >
          <Box sx={{ backgroundColor: theme.palette.primary.main, height: 64, width: 64, borderRadius: 1.5 }} >
            <img src={logo} alt="logo" style={{ height: 64, width: 64, borderRadius: 12 }} />
          </Box>

          <Stack sx={{ width: "max-content" }} direction="column" alignItems={"center"} spacing={3}>

            {Nav_Buttons.map((item) => (
              item.index === selected ?
                <Box key={item.index} p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                  <IconButton sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }} >{item.icon}</IconButton>
                </Box> : <IconButton onClick={() => { setSelected(item.index); }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }} key={item.index} >{item.icon}</IconButton>
            ))}

            <Divider sx={{ width: 60 }} />

            {selected === Nav_Setting[0].index ? <Box key={Nav_Setting[0].index} p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
              <IconButton onClick={() => { setSelected(Nav_Setting[0].index); }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }} >{Nav_Setting[0].icon}</IconButton>
            </Box> : <IconButton onClick={() => { setSelected(Nav_Setting[0].index); }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary }} key={Nav_Setting[0].index} >{Nav_Setting[0].icon}</IconButton>}

          </Stack>

          <Stack spacing={2} alignItems={"center"}>
            <AntSwitch
              defaultChecked={theme.palette.mode === "dark"}
              onChange={onToggleMode}
            />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
        
      </Box>
  );
};

export default DashboardLayout;
