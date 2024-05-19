import { Button, Skeleton } from "@mui/material";
import { Container } from "./container";
import { Logo } from "./logo";
import { Add } from "@mui/icons-material";
import { useModalStore } from "../hooks/use-modal-store";
import { useUser } from "../hooks/use-user";
import { UserButton } from "./user-button";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const { onOpen } = useModalStore();
  const { user, isPending } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="h-[60px] max-w-full z-50 bg-background-2 sticky top-0 shadow-md">
      <Container className="h-full flex items-center justify-between">
        <Logo />
        {isPending && (
          <div className="flex items-center gap-5">
            <Skeleton animation="wave" width={80} height={52} />
            <Skeleton
              animation="wave"
              variant="circular"
              width={32}
              height={32}
            />
          </div>
        )}
        {user && (
          <div className="flex items-center gap-5">
            <Button
              endIcon={<Add />}
              onClick={() => {
                onOpen("noteModal");
                if (pathname === "/") {
                  navigate("/notes");
                }
              }}
              variant="contained"
            >
              Add
            </Button>
            <UserButton />
          </div>
        )}
        {!user && !isPending && (
          <div className="flex gap-4">
            <Button
              onClick={() => onOpen("loginModal")}
              variant="contained"
              size="small"
            >
              Login
            </Button>
            <Button
              onClick={() => onOpen("signupModal")}
              variant="outlined"
              size="small"
            >
              Signup
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
};
