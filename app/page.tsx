'use client'
import { Box, Button, Modal, Stack, Typography, TextField } from "@mui/material";
import { firestore, collection, query, getDocs, doc, setDoc, getDoc, deleteDoc } from "@/firebase.js";
import React, { useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach(doc => {
      const { count } = doc.data();
      pantryList.push({ name: doc.id, count });
    });
    console.log(pantryList);
    setPantry(pantryList); // Ignore the red errors here, idk why it appears
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
      updatePantry();
    }
  };
  

  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}> ADD </Button>
      <Box border={"1px solid #333"}>
        <Box width={"800px"} height={"100px"} bgcolor={"#ADD8E6"}>
          <Typography variant="h2" color={"#333"} textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>
        {pantry.map(({ name, count }) => (
          <Box
            key={name}
            width={"100%"}
            minHeight={"150px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"#f0f0f0"}
            mb={2}
            p={2}
          >
            <Typography
              variant="h3"
              color="#333"
              textAlign={"center"}
              mb={1}
            >
              {typeof name === 'string' && name.length > 0 ? name.charAt(0).toUpperCase() + name.slice(1) : name}
            </Typography>
            <Typography variant="h4" color={"#333"} textAlign={"center"} mb={1}>
              Quantity: {count}
            </Typography>
            <Button variant="contained" onClick={() => removeItem(name)}> Remove </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
