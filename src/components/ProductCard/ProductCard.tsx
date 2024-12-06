"use client";

// MUI5 COMPONENT -------------------------------------------------------
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  Tooltip,
  Link,
} from "@mui/material";

//ICONS ----------------------------------------------------------------
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";

// HOOKS --------------------------------------------------------------
import useFavorite from "./Hooks/useFavorite";
import useAlertCopy from "@/hooks/CopyAlert/useCopyAlert";

// TYPES --------------------------------------------------------------
import TProduct from "@/types/TProduct";

// FUNCTIONS ----------------------------------------------------------
import parseDate from "@/functions/parseDate";

// STYLES
import Colors from "@/Variables/Colors";
import { useState } from "react";
import DeleteProductModal from "../Admin/DeleteModal/DeleteProductModal";
import { useTheme } from "@mui/system";

interface Prop {
  product: TProduct;
  isAdmin: boolean;
}

function ProductCard({ product, isAdmin }: Prop) {
  const { isFavorite: myFav, onClickFavorite } = useFavorite({
    name: product.id,
  });

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { alertVisible, onCopyLink } = useAlertCopy();

  const onCpLink = () => {
    onCopyLink({
      textToCopy: product.link,
      timeFromAlertVisible: 700,
    });
  };

  const theme = useTheme();

  return (
    <>
      <Card sx={{ maxWidth: 300, padding: 1, minHeight: 300 }}>
        <CardHeader
          title={
            <Link
              href={product.link}
              underline="hover"
              target="_blank"
              rel="noopener"
            >
              <Typography variant="h4" color={Colors.orange}>
                {product.title}
              </Typography>
            </Link>
          }
          subheader={`R$ ${product.Price[0].value} em ${parseDate(
            product.Price[0].date
          )}`}
          sx={{
            "& .MuiCardHeader-subheader": {
              color: "#000000",
            },
          }}
        />
        <CardMedia
          component={"img"}
          image={product.imgLink}
          alt="imagem do produto indisponível"
          height={theme.spacing(25)}
        />
        <CardActions>
          <Tooltip title={myFav ? "Desfavoritar" : "favoritar"} arrow>
            <IconButton onClick={onClickFavorite}>
              <FavoriteIcon sx={{ color: myFav ? Colors.heart : "#202020" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="copiar link do produto" arrow>
            <IconButton onClick={onCpLink}>
              <ContentCopyIcon sx={{ color: "#002243" }} />
            </IconButton>
          </Tooltip>
          {isAdmin && (
            <>
              <DeleteProductModal title={product.title} />

              <Tooltip title="Editar produto" arrow>
                <IconButton onClick={onCpLink}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </CardActions>
        {alertVisible && (
          <Box mt={2}>
            <Alert severity="success">
              Link do produto copiado com sucesso!
            </Alert>
          </Box>
        )}
      </Card>
    </>
  );
}

export default ProductCard;
