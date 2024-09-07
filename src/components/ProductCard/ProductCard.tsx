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

// HOOKS --------------------------------------------------------------
import useFavorite from "./Hooks/useFavorite";
import useAlertCopy from "@/hooks/CopyAlert/useCopyAlert";

// TYPES --------------------------------------------------------------
import TProduct from "@/types/TProduct";

// FUNCTIONS ----------------------------------------------------------
import parseDate from "@/functions/parseDate";

// STYLES
import Colors from "@/Variables/Colors";

interface Prop {
  product: TProduct;
}

function ProductCard({ product }: Prop) {
  const { isFavorite: myFav, onClickFavorite } = useFavorite({
    name: product.id,
  });

  const { alertVisible, onCopyLink } = useAlertCopy();

  const onCpLink = () => {
    onCopyLink({
      textToCopy: product.link,
      timeFromAlertVisible: 700,
    });
  };

  return (
    <>
      <Card sx={{ maxWidth: 300, padding: 1 }}>
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
        />
        <CardMedia component={"img"} image={product.imgLink} />
        <CardActions>
          <Tooltip title={myFav ? "Desfavoritar" : "favoritar"} arrow>
            <IconButton onClick={onClickFavorite}>
              <FavoriteIcon sx={{ color: myFav ? Colors.heart : "gray" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="copiar link do produto" arrow>
            <IconButton onClick={onCpLink}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
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
