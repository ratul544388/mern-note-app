import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/container";
import { useModalStore } from "../hooks/use-modal-store";
import { useUser } from "../hooks/use-user";

export const Home = () => {
  const { onOpen } = useModalStore();
  const navigate = useNavigate();
  const { user } = useUser();
  const handleClick = () => {
    if (user) {
      onOpen("noteModal");
      navigate("/notes");
    } else {
      onOpen("loginModal");
    }
  };
  return (
    <Container element="main" className="flex items-center justify-center">
      <Button onClick={handleClick} endIcon={<Add />} variant="contained">
        Create Your note
      </Button>
    </Container>
  );
};
