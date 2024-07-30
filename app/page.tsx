'use client'
import { Box, Stack, Typography } from "@mui/material";
import {firestore, collection, query, getDocs} from "@/firebase.js"
import { useEffect } from "react";

const items = ["tomato", "potato", "onion", "garlic", "ginger", "carrot", "lettuce", "kale", "cucumber"]
export default function Home() {
  useEffect(() => {
    const updatePantry = async () => {

    const snapshot = query(collection(firestore, "pantry"))
    const docs = await getDocs(snapshot)
    docs.forEach(doc => {
      console.log(doc.id, doc.data())
    });
    }
  }, [])
  return <Box
  width={"100%"}
  height={"100vh"}
  display={"flex"}
  justifyContent={"center"}
  alignItems={"center"}
  flexDirection={"column"}
  >
    <Box
    border={"1px solid #333"}>
    <Box
    width={"800px"}
    height={"100px"}
    bgcolor={"#ADD8E6"}
    >
      <Typography variant="h2" color={"#333"} textAlign={"center"}>
        Pantry Items
      </Typography>
    </Box>
    <Stack
    width={"800px"}
    height={"400px"}
    spacing = {2}
    overflow={"auto"}>
      {items.map((i) => (
        <Box
        key={i}
        width={"100%"}
        height={"100px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"#f0f0f0"}
        >
          <Typography
          variant="h3"
          color = "#333"
          textAlign={"center"}
          >
            {
              i.charAt(0).toUpperCase() + i.slice(1)
            }
            </Typography>
        </Box>
      )) }
    </Stack>
    </Box>
  </Box>
}
