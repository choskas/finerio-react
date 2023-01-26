import { useEffect, useState } from "react";
import { userData, userMovements } from "../../api";
import LogoutIcon from "@mui/icons-material/Logout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MovementsT, User } from "./types";
import { CardWrapper, TableWrapper, UserInfo } from "./Movements.styles";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import FinerioLogo from "../../assets/finerioLogo.png";

const Movements = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [movements, setMovements] = useState<MovementsT[] | null>(null);
  const [tableCounter, setTableCounter] = useState<number>(10);
  const fetchMovements = async (id: string, counter = 10) => {
    const movementsData = await userMovements(
      sessionStorage.getItem("TOKEN") as string,
      id,
      counter
    );
    setMovements(movementsData.data);
  };
  const getInitialInfo = async () => {
    try {
    const data = await userData(sessionStorage.getItem("TOKEN") as string);
    setUser(data);
    await fetchMovements(data.id);
    const isInBottom = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        let newCounter = tableCounter + 10;
        setTableCounter((prevState) => prevState + 5);
        fetchMovements(data.id, newCounter);
        window.removeEventListener("scroll", isInBottom);
      }
    };
    window.addEventListener("scroll", isInBottom);
} catch (error) {
    navigate("/");
}
  };
  const onLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getInitialInfo();
  }, []);
  if (!sessionStorage.getItem('TOKEN')){
    return <Navigate to='/' />
  }
  return (
    <TableWrapper>
      <img src={FinerioLogo} alt="Finerio logo" />
      <div className="info-logout">
        <UserInfo>
          <p>¡Hola, {user && user.name}!</p>
          <p>{user?.email}</p>
        </UserInfo>
        <Button
          className="logout-button"
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
        >
          Logout
        </Button>
        <Button
          className="logout-button-responsive"
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
        ></Button>
      </div>
      <p className="description">
        Aqui podrás consultar tus movimientos mas recientes{" "}
      </p>
      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Creado el</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movements &&
              movements.slice(0, tableCounter).map((item) => (
                <TableRow key={item.id} sx={{ height: "100px" }}>
                  <TableCell component="th" scope="row">
                    {new Date(item.dateCreated).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    $ {item.amount.toString()}
                  </TableCell>
                  <TableCell align="right">{item.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CardWrapper>
        {movements &&
          movements.slice(0, tableCounter).map((item) => (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.description}
                </Typography>
                <Typography variant="h5" component="div">
                  $ {item.amount.toString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {new Date(item.dateCreated).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </CardWrapper>
    </TableWrapper>
  );
};

export default Movements;
