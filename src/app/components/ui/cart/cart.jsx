import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getcartList, getcartTotalPrice } from "../../../../store/cart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CartItem from "./catrItem";
import { Typography } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Box } from "@mui/system";

const Cart = () => {
    const cartList = useSelector(getcartList());
    const PdfRef = useRef();

    const getDate = () => {
        const current = new Date();
        const month =
            current.getMonth() + 1 < 10
                ? `0${current.getMonth() + 1}`
                : current.getMonth() + 1;
        return `${current.getDate()}.${month}.${current.getFullYear()}`;
    };

    const savePDF = () => {
        const doc = new jsPDF({
            orientation: "p",
            unit: "pt",
            format: "a4",
        });

        const element = PdfRef.current;

        html2canvas(element, { background: "white" }).then(function (canvas) {
            doc.addImage(canvas, "jpeg", 20, 20).save("/KP");
        });
    };

    const total = useSelector(getcartTotalPrice());
    if (cartList.length === 0) {
        return (
            <Typography variant="h5" component={"h3"} align={"center"}>
                Корзина пуста
            </Typography>
        );
    } else
        return (
            <>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead
                            sx={{
                                maxWidth: 400,
                                fontWeight: 700,
                                fontSize: 18,
                            }}
                        >
                            <TableRow>
                                <TableCell
                                    sx={{ fontWeight: 700, fontSize: 18 }}
                                >
                                    №
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700, fontSize: 18 }}
                                >
                                    Изображение
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        maxWidth: 400,
                                        fontWeight: 700,
                                        fontSize: 18,
                                    }}
                                >
                                    Наименование
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700, fontSize: 18 }}
                                >
                                    Количество
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700, fontSize: 18 }}
                                >
                                    Цена
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700, fontSize: 18 }}
                                >
                                    Стоимость
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontWeight: 700, fontSize: 18 }}
                                >
                                    Удалить
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            {cartList.map((row, index) => (
                                <CartItem
                                    row={row}
                                    index={index}
                                    key={row._id}
                                    pdf={false}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    alignItems="center"
                    mt={2}
                >
                    <Item>
                        <Button variant="contained" onClick={savePDF}>
                            Получить КП
                        </Button>
                    </Item>
                    <Item>
                        <Button variant="outlined">Заявка менеджеру</Button>
                    </Item>
                    <Item>
                        <Typography
                            variant="h5"
                            component={"h3"}
                            align={"right"}
                        >
                            ИТОГО: {total}р
                        </Typography>
                    </Item>
                </Stack>
                <Box
                    ref={PdfRef}
                    sx={{
                        maxWidth: "720px",
                        position: "absolute",
                        right: "-1500px",
                    }}
                >
                    <h3>Коммерческое предложение от {getDate()}</h3>

                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead
                                sx={{
                                    maxWidth: 400,
                                    fontWeight: 700,
                                    fontSize: 18,
                                }}
                            >
                                <TableRow>
                                    <TableCell
                                        sx={{ fontWeight: 700, fontSize: 18 }}
                                    >
                                        №
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ fontWeight: 700, fontSize: 18 }}
                                    >
                                        Изображение
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{
                                            maxWidth: 400,
                                            fontWeight: 700,
                                            fontSize: 18,
                                        }}
                                    >
                                        Наименование
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ fontWeight: 700, fontSize: 18 }}
                                    >
                                        Количество
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ fontWeight: 700, fontSize: 18 }}
                                    >
                                        Цена
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ fontWeight: 700, fontSize: 18 }}
                                    >
                                        Стоимость
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                {cartList.map((row, index) => (
                                    <CartItem
                                        row={row}
                                        index={index}
                                        key={row._id}
                                        pdf={true}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Item>
                        <Typography
                            variant="h5"
                            component={"h3"}
                            align={"right"}
                        >
                            ИТОГО: {total}р
                        </Typography>
                    </Item>
                </Box>
            </>
        );
};
export default Cart;
